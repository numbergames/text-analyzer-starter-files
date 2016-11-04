(function textAnalyzer() {
  "use strict";

  function doAnalysis() {
    let textblock = $('#user-text').val();

    let stats = analyze(textblock);

    Object.keys(stats).forEach(x => 
      $('#js-' + x).text(stats[x])
    );

    $('dl.hidden').removeClass('hidden');

    console.log(stats);
  }

  function analyze(text) {
    let words = text.toLowerCase().split(/[^a-z']/).filter(Boolean);
    let sentences = text.split('.').map(x => x.trim());
    
    let wordCount = words.length;

    let uniqueWordCount = (function () {
      let uniqueWords = { };
      words.forEach(x => uniqueWords[x] = true);

      return Object.keys(uniqueWords).length;
    }());

    let averageWordLength = (words.reduce((x, y) => x + y.length, 0) 
        / wordCount).toFixed(2);

    let averageSentenceLength = (function () {
      let numSentences = sentences.length;
      let sentencesLength = sentences.map(x => x.length)
        .reduce((x, y) => x + y);

      return (sentencesLength / numSentences).toFixed(2);
    }());

    return {
      wordCount,
      uniqueWordCount,
      averageWordLength,
      averageSentenceLength
    };
  }

  $('button').click(doAnalysis);

}());
