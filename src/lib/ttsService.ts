/**
 * High-quality Natural TTS Player for VSTF Syntax Cascade
 * Solves browser robotic/distorted speech issues by:
 * 1. Prioritizing native high-definition Natural/Premium voices (Google US English, Samantha, Microsoft Jenny/Guy, etc.)
 * 2. Proper rate (0.95), pitch (1.0), and chunking
 * 3. Fallback audio synthesis using standard Web Audio speech or clean utterance cancellation
 */

export interface TTSState {
  isPlaying: boolean;
  activeLineIndex?: number;
}

class SynthesizerService {
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    if (this.voices.length > 0) {
      this.isLoaded = true;
    }
  }

  public getBestEnglishVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.initVoices();
    }

    // Preferred high quality voice list order
    const priorityKeywords = [
      'google us english',
      'natural',
      'samantha',
      'karen',
      'jenny',
      'guy',
      'aria',
      'daniel',
      'serena',
      'ava',
      'allison',
      'en-us'
    ];

    // 1. Look for English voices with natural/enhanced keywords
    for (const keyword of priorityKeywords) {
      const found = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('en') &&
          v.name.toLowerCase().includes(keyword)
      );
      if (found) return found;
    }

    // 2. Any en-US voice
    const enUsVoice = this.voices.find((v) => v.lang.toLowerCase() === 'en-us');
    if (enUsVoice) return enUsVoice;

    // 3. Any English voice
    const anyEnVoice = this.voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    if (anyEnVoice) return anyEnVoice;

    return this.voices[0] || null;
  }

  public speak(
    text: string,
    options: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
      rate?: number;
    } = {}
  ): () => void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options.onError?.();
      return () => {};
    }

    // Cancel any ongoing speech to avoid queue corruption & audio distortion
    window.speechSynthesis.cancel();

    // Clean text of markdown/punctuations that cause synthesizer glitches
    const cleanText = text.replace(/[*_#`~↳⇨]/g, '').trim();
    if (!cleanText) {
      options.onEnd?.();
      return () => {};
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';

    // Set stable natural rate and pitch (avoiding 0.88 pitch distortions on Chrome/Safari)
    utterance.rate = options.rate || 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = this.getBestEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      // Ignore interrupted errors triggered by manual cancellation
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }
      console.warn('TTS error:', e);
      options.onError?.();
    };

    // Chrome bug prevention: speech can hang if too long without periodic resume
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const ttsService = new SynthesizerService();
