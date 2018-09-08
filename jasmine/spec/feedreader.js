
$(function () {
    

    describe('RSS Feeds', () => {
        

        it('are defined', () => {
            
            expect(allFeeds).toBeDefined();
            
            expect(allFeeds.length).not.toBe(0);
        
        });


       

        it('should have valid urls', () => {
            
            allFeeds.forEach((feedObj) => { //looping through the array 
            
                expect(feedObj.url).toBeTruthy(); //checking that the url property of each object in the array is defined and not an empty string
            
            });
         
        })


        it('should have valid names', () =>{
            
            allFeeds.forEach((feedObj) => {
                        
                expect(feedObj.name).toBeTruthy(); //checking that the name property of each object in the array is defined and is not an empty string
            
            });
            
        })
    });



    describe("The menu", () =>{


        it("should be hidden", () =>{
            
            expect($('body').hasClass('menu-hidden')).toBe(true); // checking that the body had the class for hiding the menu
        
        })


        it('should respond to click', () =>{
            
            $('.menu-icon-link').click(); // trigerring a click event on the hamburger menu
            
            expect($('body').hasClass('menu-hidden')).toBe(false); // checking that the menu-hidden class is removed from the body (therefore showing the menu)

            $('.menu-icon-link').click();
            
            expect($('body').hasClass('menu-hidden')).toBe(true); // checking that the menu-hidden class is added back to the body
        
        })
    })

       

    describe('Initial Entries', () =>{

        beforeEach(function(done){

            loadFeed(0 , done);// ensuring the feed is loaded before hand
            
       
        })

        it("should be at least one", function(){

            expect($('.feed .entry').length).toBeGreaterThan(0); // checking that the ".feed" div has at least one ".entry" child

        })

    })


    describe('New Feed Selection', () =>{


        let oldFeed, newFeed; // variable for storing old and new feed globally defined so all functions have access to it 



        beforeEach(function(done){ 
           
            loadFeed(0 , () =>{  // loading the feed from the first allFeed object url
                
                oldFeed = $('.feed').html(); // getting feed added to the page from the loadFeed function called above

                loadFeed(Math.ceil(Math.random() * 3) , done) // loading feed from the objects at random between index[1 - 3] of the allFeeds array to compare 
            
            });

        })

       
        it('should load new feed', function(){
                
            newFeed = $('.feed').html(); // getting new feed

            expect(newFeed).not.toBe(oldFeed); // checking that they are different

        })

    })

}());
