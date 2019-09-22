/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* Ensures allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures all feeds have a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function(){
            allFeeds.forEach (function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }) 
        });


        /* Ensures all feeds have a name defined
         * and that the name is not empty.
         */
        it('have names', function(){
            allFeeds.forEach (function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }) 
        });

    });


    describe ('The menu', function(){
        /* Ensures the menu element is
         * hidden by default. 
         */
        it('default hidden', function(){
            expect(document.getElementsByTagName('body')[0].className).toBe('menu-hidden');
        });

         /* Ensures the menu changes
          * visibility when the menu icon is clicked.
          */

         it('toggles when clicked', function(){
            document.getElementsByClassName('menu-icon-link')[0].click()
            expect(document.getElementsByTagName('body')[0].className).toBe('');
            document.getElementsByClassName('menu-icon-link')[0].click()
            expect(document.getElementsByTagName('body')[0].className).toBe('menu-hidden');
         }); 
    });


    describe ('Initial Entries', function(){
       /* Ensures when the loadFeed function is called and completes 
         * its work, there is at least a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
             setTimeout (loadFeed(0, function(){
                 done();
             }), 5000);
        });
            
        it('loads and has at least one entry', function(done) {
            expect(document.getElementsByClassName('entry').length).not.toBe(0);
            done();

        });
    });
        
    describe('New Feed Selection', function(){
        /* Ensures when a new feed is loaded by the loadFeed function 
         *that the content actually changes.
         */
        
        var firstFeedFirstEntry;
        var secondFeedFirstEntry;
        beforeEach(function(done) {
            // Load the first feed and then the second feed.
             setTimeout (loadFeed(1, function(){
                 // Grab the first entry of this first feed.
                firstFeedFirstEntry = document.getElementsByClassName('entry')[0].innerHTML;
                loadFeed(2, function(){
                    // Grab the first entry of this second feed.
                    secondFeedFirstEntry = document.getElementsByClassName('entry')[0].innerHTML;
                    done();
                });
             }), 5000);
        });
            
        it('updates the content on for new feed', function(done) {
            expect(firstFeedFirstEntry).not.toBe(secondFeedFirstEntry);
            done();
        });
    });
}())
