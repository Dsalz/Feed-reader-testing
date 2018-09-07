/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            
            expect(allFeeds).toBeDefined();
            
            expect(allFeeds.length).not.toBe(0);
        
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('should have valid urls', () => {
            
            allFeeds.forEach((feedObj) => { //looping through the array 
            
                expect(feedObj.url).toBeDefined(); //checking that the url property of each object in the array is defined
            
                expect(feedObj.url).not.toBe(""); //checking that the url property of each object in the array is not an empty string
            
            });
         
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have valid names', () =>{
            
            allFeeds.forEach((feedObj) => {
            
                expect(feedObj.name).toBeDefined(); //checking that the name property of each object in the array is defined
            
                expect(feedObj.name).not.toBe(""); //checking that the name property of each object in the array is not an empty string
            
            });
            
        })
    });


    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", () =>{

         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it("should be hidden", () =>{
            
            expect($('body').hasClass('menu-hidden')).toBe(true); // checking that the body had the class for hiding the menu
        
        })


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('should respond to click', () =>{
            
            $('.menu-icon-link').trigger('click'); // trigerring a click event on the hamburger menu
            
            expect($('body').hasClass('menu-hidden')).toBe(false); // checking that the menu-hidden class is removed from the body (therefore showing the menu)

            $('.menu-icon-link').trigger('click');
            
            expect($('body').hasClass('menu-hidden')).toBe(true); // checking that the menu-hidden class is added back to the body
        
        })
    })

       


    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', () =>{



        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){

            loadFeed(0 , () =>{ // ensuring the feed is loaded before hand
               
                done();
           
            });
       
        })

        it("should be at least one", function(done){

            expect($('.feed').find('.entry').length > 0).toBe(true); // checking that the ".feed" div has at least one ".entry" child

            done();

        })

    })

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', () =>{

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let oldFeed; // variable for storing old feed globally defined so all functions have access to it 

        beforeEach(function(done){ 
           
            loadFeed(0 , () =>{  // loading the feed from the first allFeed object url
                
                oldFeed = $('.feed').html(); // getting feed added to the page from the loadFeed function called above

                loadFeed( Math.ceil(Math.random() * 3) , () =>{ // loading feed from the objects at index[1 - 3] of the allFeeds array to compare 
                
                    done();
                
                });
            
            });

        })

       
        it('should load new feed', function(done){
                
            let newFeed = $('.feed').html(); // getting new feed

            expect(newFeed).not.toBe(oldFeed); // checking that they are different

            done();

        })

    })

}());
