const RemoveQuotes = require('./word-guesser-tools').RemoveQuotes;

test('removes quotes from text', () => {
    expect(RemoveQuotes('"FART"')).toBe('FART');
});

test('removes quotes from text', () => {
    expect(RemoveQuotes('FART')).toBe('FART');
});