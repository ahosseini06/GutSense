
module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'GET',
        path: '/questions', // Only match when the URL parameter is composed of lowercase letters
        handler: 'diagnosis.getQuestions',
      }
    ]
  }