var casper = require("casper").create();

casper.start("http://www.austindog.org/adoption/available-dogs/all-available-dogs", function() {
    var dogs = this.fetchText(".djcf_items_blog");
    // dogs = dogs.split("details")
    this.echo(dogs)
});

casper.run();
