// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

var exitCode = 0;


// Cordova is ready
//
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
        exitCode++;

        if (exitCode >= 2) {
            e.preventDefault();
            navigator.app.exitApp();
        } else {
            $.mobile.loading('show', {
                text: '再按一次退出程序',
                textonly: true,
                textVisible: true,
                theme: 'b',
                html: ""
            });
            setTimeout(function () {
                $.mobile.loading('hide');
                exitCode--;
            }, 5000);
            e.preventDefault();
            return false;
        }
    }, false);
}
$(document).bind("mobileinit", function () {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'slide';
    $.mobile.defaultPageTransition = 'slide';
});

$(document).bind("pageinit", function () {
 
    console.log("pageinit");
    $("#btnSearch").unbind("click").bind("click", function () {   
        getData();
    });
});
function getData() {
    var com = $("#company").val();
    var pno = $("#exnum").val();

    if (pno == "") {
        $.mobile.loading('show', {
            text: '请输入快递单号',
            textonly: true,
            textVisible: true,
            theme: 'b',
            html: ""
        });
        setTimeout(function () {
            $.mobile.loading('hide');
        }, 2000);
        return;
    }

    $.mobile.loading('show', {
        text: '查询中...',
        textVisible: true,
        theme: 'b',
        html: ""
    });

 

    // Construct the URL
    var serverurl = "http://kuaidi001.sinaapp.com/searchapi.php?nu=" + pno + "&com=" + com + "&callback=?";
    //var serverurl = "http://10.197.60.49:7079/searchapi.php?nu=" + pno + "&com=" + com + "&callback=?";

    console.log(serverurl);

    // Send the JSONP request using jQuery
    $.ajax({
        url: serverurl,
        dataType: 'jsonp',
        cache: false,
        success: function (data) {
            console.log("success ajax" + data);
            $("#result").html( data);
            $.mobile.loading('hide');
            $.mobile.changePage($('#popup'), 'pop', false, true);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.log(thrownError);
            //$("#result").html(thrownError);
            $.mobile.changePage($('#popup'), 'pop', false, true);
            $.mobile.loading('hide');
        }
    });
}