// Latency Comparison Numbers
// ...read more


//var Programmer = function() {
//    this.languages = [];
//};
//
//Programmer.prototype.learnNewLanguage = function(lang) {
//    //if (this.languages.indexOf(lang) == -1) {
//        this.languages.push(lang);
//    //}
//};
//
//Programmer.prototype.isPragmatic = function() {
//    return this.languages.length >= 3;
//};

// ['JS', 'Java', 'Clojure'].forEach(p.learnNewLanguage, p)

function createProgrammer() {
    var languages = [];

    return {
        learnNewLanguage: function (lang) {
            languages.push(lang);
        },

        isPragmatic: function() {
            return languages.length >= 3;
        }
    };
}