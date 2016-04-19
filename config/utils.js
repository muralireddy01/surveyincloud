module.exports = {
    
    port: process.env.PORT || 3000,
    domain: process.env.DOMAIN || "localhost",
    
    getDomain: function () {
        if (this.port === 3000) {
            return "http://" + /*this.domain*/ "g3n1.co"; //Harcoded to make it nice
        }
        return "http://" + this.domain;
    }
};




