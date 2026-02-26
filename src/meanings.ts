/**
 * Detailed meanings for Numerology Numbers
 */

export const coreMeanings: Record<number, string> = {
  1: "The Independent Leader. You are a pioneer, driven by a strong sense of individuality and a desire to lead. You possess great creative potential and the courage to forge your own path.",
  2: "The Diplomatic Peacemaker. You thrive on harmony, cooperation, and sensitivity. You have a natural ability to see both sides of a situation and bring people together.",
  3: "The Creative Communicator. You are expressive, social, and full of joy. Your gift lies in self-expression, whether through art, speech, or writing, and you inspire others with your optimism.",
  4: "The Disciplined Builder. You value stability, hard work, and organization. You are the foundation of any project, bringing practicality and persistence to everything you do.",
  5: "The Versatile Adventurer. You crave freedom, change, and variety. You are a natural explorer who learns through experience and thrives in dynamic environments.",
  6: "The Harmonious Nurturer. You are deeply responsible, loving, and focused on family and community. Your path involves service to others and creating beauty in your surroundings.",
  7: "The Analytical Seeker. You are introspective, spiritual, and driven to uncover the truth. You possess a keen mind and a need for solitude to process your deep insights.",
  8: "The Authoritative Powerhouse. You are focused on material success, balance, and authority. You have the executive ability to manifest large-scale projects and achieve financial stability.",
  9: "The Compassionate Humanitarian. You are idealistic, generous, and focused on the greater good. Your journey involves selfless service and a broad, global perspective.",
  11: "The Intuitive Visionary (Master Number). You possess heightened sensitivity and spiritual insight. You are a 'messenger' meant to inspire others with your illumination.",
  22: "The Master Builder (Master Number). You have the unique ability to take lofty spiritual visions and manifest them into concrete, large-scale reality for the benefit of humanity.",
  33: "The Master Teacher (Master Number). You represent the highest level of selfless service and spiritual guidance. Your path is one of unconditional love and healing on a global scale."
};

export const karmicMeanings: Record<number, string> = {
  13: "Karmic Debt 13: Focus and Discipline. This number suggests a need to overcome laziness and lack of focus. Success comes through steady, disciplined effort and avoiding shortcuts.",
  14: "Karmic Debt 14: Temperance and Stability. This indicates a past misuse of freedom. Your path requires finding balance, avoiding overindulgence, and staying committed to your goals.",
  16: "Karmic Debt 16: Spiritual Rebirth. This number often involves the 'falling away' of the ego. It is a path of deep spiritual awakening, requiring you to rebuild your life on a more authentic foundation.",
  19: "Karmic Debt 19: Independence and Support. This suggests a need to learn how to stand on your own feet while also learning to accept help from others when needed."
};

export const categoryContexts: Record<string, string> = {
  lifePath: "Your Life Path represents the core journey you are on in this lifetime—the lessons you've come to learn and the natural traits you possess.",
  destiny: "Your Destiny (or Expression) number reveals your natural talents, capabilities, and the 'outer' purpose of your life's work.",
  soulUrge: "Your Soul Urge (Heart's Desire) reflects your inner motivations, your secret dreams, and what truly makes your soul feel satisfied.",
  personality: "Your Personality number describes the 'mask' you wear—the traits you project to the world and how others first perceive you.",
  birthday: "Your Birthday number highlights a specific sub-lesson or talent that supports your overall Life Path journey.",
  personalYear: "Your Personal Year indicates the specific theme and energy of your current 12-month cycle, helping you align with the timing of your life.",
  personalMonth: "Your Personal Month narrows down the theme of the year into a specific monthly focus.",
  personalDay: "Your Personal Day provides a micro-focus for today's energy.",
  compatibility: "This number reflects the combined vibration of your relationship, highlighting the shared energy and potential challenges between you.",
  address: "Your House or Address number influences the atmosphere and energy of your living or working space.",
  business: "This number reflects the 'brand' vibration and commercial potential of your business or professional identity."
};

export function getMeaning(category: string, result: { value: number, isMaster: boolean, isKarmic: boolean, karmicNumber?: number }): string {
  const context = categoryContexts[category] || "";
  let baseMeaning = coreMeanings[result.value] || "A unique vibration of potential and growth.";
  
  if (result.isMaster && coreMeanings[result.value]) {
    baseMeaning = coreMeanings[result.value];
  }

  let karmicNote = "";
  if (result.isKarmic && result.karmicNumber && karmicMeanings[result.karmicNumber]) {
    karmicNote = `\n\n**Note:** ${karmicMeanings[result.karmicNumber]}`;
  }
  
  return `${context} ${baseMeaning}${karmicNote}`;
}

export function generateSummary(results: any): string {
  if (!results) return "";
  const { lifePath, destiny, soulUrge, personality } = results;
  
  const lpTitle = coreMeanings[lifePath.value]?.split('.')[0] || "Leader";
  const destinyTitle = coreMeanings[destiny.value]?.split('.')[0] || "Creator";
  
  let summary = `Your numerological blueprint is a unique tapestry of vibrations. At your core, your **Life Path ${lifePath.value}** (${lpTitle}) defines your primary journey and the lessons you are here to master. This is beautifully complemented by your **Destiny ${destiny.value}** (${destinyTitle}), which represents the natural talents and capabilities you bring to the world.`;
  
  summary += `\n\nYour inner world is fueled by the **Soul Urge ${soulUrge.value}**, reflecting your deepest heart's desires, while your **Personality ${personality.value}** acts as the bridge through which you interact with others.`;
  
  if (lifePath.isMaster || destiny.isMaster) {
    summary += `\n\nWith Master Numbers present in your core, you carry a heightened spiritual responsibility and the potential for significant impact on a large scale.`;
  }

  if (lifePath.isKarmic || destiny.isKarmic) {
    summary += `\n\nYour profile also contains Karmic Debt, suggesting specific areas where you are meant to transform past patterns into new strengths through discipline and awareness.`;
  }

  return summary;
}
