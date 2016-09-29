// Initialize your app
var myApp = new Framework7(

    { template7Pages: true }
);

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('search', function (page) {
    // Default

    var calendarDefault = myApp.calendar({
        input: '#calendar-default',
    });
});

// myApp.onPageInit('searchbar', function (page) {

//     $$('#searchsubmit').on('click', function () {

//         var codeOrName = $$('#codename').val();
//         var query = 'http://localhost:9999/address/city/findByCodeOrName';

//         alert(JSON.stringify(codeOrName));
//         myApp.showIndicator();
//         $$.ajax({
//             url: query,
//             type: "GET",
//             dataType: "JSON",
//             data: codeOrName,
//             // if successful response received (http 2xx)
//             success: function (data, textStatus) {

//                 // We have received response and can hide activity indicator
//                 myApp.hideIndicator();
//                 data = JSON.parse(data);
//                 myApp.alert(data);
//                 // Will pass context with retrieved user name 
//                 // to welcome page. Redirect to welcome page
//                 mainView.router.loadPage("../user/index.html");

//             },
//             error: function (xhr, textStatus, errorThrown) {
//                 // We have received response and can hide activity indicator
//                 myApp.hideIndicator();
//                 myApp.alert(XMLHttpRequest.status);
//                 myApp.alert(XMLHttpRequest.readyState);
//                 myApp.alert(textStatus);
//             }
//         });


//     });
// });


myApp.onPageInit('searchbar', function (page) {
    $$('#searchsubmit').on('click', function () {
        $$('form.ajax-submit').on('submitted', function (e) {
            var xhr = e.detail.xhr; // actual XHR object
            var data = e.detail.data; // Ajax repsonse from action file
            // do something with response data
            data = JSON.parse(data);
            var myobj = eval(data);
            var content = '';
            for (var x in myobj) {
                content +=
                    ' <ul> ' +
                    '<li>' +
                    ' <label class="label-radio item-content">' +
                    '<input type="radio" name="my-radio" value= ' + myobj[x].name + ' id="cityname' + x + '">' +
                    ' <div class="item-inner">' +
                    '<div class="item-title">' + myobj[x].name + '</div>' +
                    ' </div>' +
                    ' </label>' +
                    '</li> ' +
                    '</ul>'
            }
            mainView.router.loadContent(
                '<!-- Top Navbar-->' +
                '<div class="navbar">' +
                '  <div class="navbar-inner">' +
                '    <div class="left"><a href="../user/searchbar.html" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
                '  <div class="navbar-inner">' +
                '    ' +

                '    <div class="center sliding">选择城市</div>' +
                '  </div>' +
                '</div>' +
                '<div class="pages">' +
                '  <!-- Page, data-page contains page name-->' +
                '  <div data-page="citychoice" class="page">' +
                '    <!-- Scrollable page content-->' +
                '    <div class="page-content">' +
                '      <div class="list-block">' +
                '<form action="../user/search.html" method="GET" class="ajax-submit " id="city">' +
                content +

                '  <button type="submit" id="" class="button button active" id="citysubmit">确认</button>'+
                '</form>'
                +
                


                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
            )
        });
    });

});

myApp.onPageInit('result', function (page) {
    // Default

    var calendarDefault = myApp.calendar({
        input: '#calendar-default',
    });
});




$$('#indexcheck').on('click', function () {
    var formData = myApp.formToJSON('#login');
  
});

myApp.onPageInit('citychoice', function (page) {
    var formData = myApp.formToJSON('#city');
    alert(JSON.stringify(formData));

    $$('#citysubmit').on('click', function () {

        alert("asfdfsdfsddc");
    }
    
    
    );
    $$('#cityname').on('click', function () {
        mainView.router.loadPage("../user/search.html")
    });


});


myApp.onPageInit('search', function (page) {

    $$('form.ajax-submit').on('submitted', function (e) {
        var data = e.detail.data; // Ajax repsonse from action file
        // do something with response data
        data = JSON.parse(data);
        var myobj = eval(data);
        $$('#startcity').val(data);
    });


});

myApp.onPageInit('calendar', function (page) {
    var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
    var calendarInline = myApp.calendar({
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        toolbarTemplate:
        '<div class="toolbar calendar-custom-toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
        }
    });
});

// Generate dynamic page

function backtopage() {
    mainView.router.loadPage("../user/searchbar.html");
}

var dynamicPageIndex = 0;
function createContentPage() {
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">hahah ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}



