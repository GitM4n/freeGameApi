export const splitToParagraphs = (text: string) => {
    if (!text) return '';

    const sentences = text.split('.');

    const filteredSentences = sentences.filter(sentence => sentence.trim() !== '');

    let paragraphs = [];

    for (let i = 0; i < filteredSentences.length; i += 4) {
        let paragraph = filteredSentences.slice(i, i + 4).join('. ') + '.';
        paragraphs.push(paragraph.trim());
    }

    return paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
}