export function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
