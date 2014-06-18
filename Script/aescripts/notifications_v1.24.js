

/* IE FIX for SetTimeout using multi arguments */
/*if (document.all && !window.setTimeout.isPolyfill) {
  var __nativeST__ = window.setTimeout;
  window.setTimeout = function (vCallback, nDelay) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };
  window.setTimeout.isPolyfill = true;
}*/



// START NOTIFICATIONS
var notif_url = ""; var notif_cnt = 0; var notif_lastid = 0;
var notif_nexttime = 20; var notif_closeall = 0;
var notif_duration = 6000;
var notif_alerts = 0;
var notif_pagetitle = document.title;
var notif_mem = [];
var notif_limit = 8;
var notif_nextfile = "";
var notif_titleloadtime = 200;
var notif_type = 0;


function notifications(url, loadingtype, notifquant, notiftype) {
    if(notiftype){ notif_type = notiftype; }
    if(notifquant){ notif_limit = notifquant; }
    $.extend($.notificationOptions, {
        click: function() {
            //this.hide();
        },
        fadeIn: 100,
        fadeOut: 100,
        //slideUp: 1000,
        limit: notif_limit,
        queue: true,
        horizontal: 'left',
        vertical: 'bottom',
        duration: 8000
    })
    if(loadingtype==-1){
    }else if(loadingtype==0){
        get_notifications(url);
    }else{
        setTimeout("get_notifications('" + url + "')",loadingtype*1000);
    }
}


function get_notifications(url) {
    if(notif_url==""){ notif_url = url; }
    
    var tmp_time = 100;
    
    if(notif_lastid!=0){// reload
        setTimeout(function(){notifications_browser_title_update("ini start")},notif_titleloadtime);
        setTimeout(function(){notifications_browser_title_update("ini start")},notif_titleloadtime+200);
        url = notif_url + "&id=" + notif_lastid + "&c=" + notifications_random_string(12);
        if(notif_nextfile){ url=notif_nextfile + "&c=" + notifications_random_string(12); }
    }else{// first load
        url = notif_url + "&c=" + notifications_random_string(12);
    }
    


    $.ajax({
	    url: url,
	    dataType: "xml",
	    success: function (xml) {
		    var tmp_error = 1; var tmp_id = 0;  var tmp_cnt = 0;
            
            // XML PARAMS
            $(xml).find('notifications').each(function () {
                notif_nexttime = parseInt($(this).attr('nexttime'), 10);
                notif_closeall = parseInt($(this).attr('closeall'), 10);
                notif_nextfile = $(this).attr('nextfile');
            });

            // CLOSE PREVIOUS
            if(notif_closeall==1){ notif_empty("param"); }
            //notifications_browser_title_update("ini");
            /*setTimeout(function(){notifications_browser_title_update("ini start")},notif_titleloadtime);
            setTimeout(function(){notifications_browser_title_update("ini start")},notif_titleloadtime+200);*/


            // READ NEW NOTIFS
		    $(xml).find('notification').each(function () {
                
		        tmp_id = parseInt($(this).attr('id'), 10);
                
                // check if exists
                if(notif_checkup(tmp_id)){
                        notif_alerts++;

                    //}else{// content lines
		                tmp_tag = $(this).find('tag').text();
		                tmp_info = $(this).find('info').text();
		                tmp_url = $(this).find('url').text();
                        tmp_display = $(this).find('display').text();
                        tmp_duration = $(this).find('duration').text();
                        tmp_date = $(this).find('date').text();

                        // date test ---
                        tmp_date2 = "";
                        if(tmp_date!=""){
                            if(notif_type==0){
                                tmp_date2='<em>'+tmp_date+'</em>';
                            }else{
                                tmp_date2='<div class="notif_time">'+tmp_date+'</div>';
                            }
                        }
                        tmp_info+=tmp_date2;
                        // -----------------

                        
                        if(tmp_url!=""){
                            tmp_html = '<div class="close" onclick="notifications_actions(' +  tmp_id + ', 0);"></div>';
                            tmp_html+='<div class="notification-box-header"></div><div class="notification-box-content">';
                            //tmp_html+= '<span class="'+tmp_tag+'"></span><div class="notif_info"><a href="'+tmp_url+'">'+tmp_info+'</a></div>';
                            tmp_html+= '<a href="'+tmp_url+'"><span class="'+tmp_tag+'"></span><div class="notif_info">'+tmp_info+'</div></a>';
                            //tmp_html+= '<div class="notif_info '+tmp_tag+'"><a href="'+tmp_url+'">'+tmp_info+'</a></div>';
                            tmp_html+='</div><div class="notification-box-footer"><a href="'+tmp_url+'"></a></div>';
                        }else{
                            tmp_html ='<div class="notification-box-header"></div><div class="notification-box-content">';
                            //tmp_html+= '<span class="'+tmp_tag+'"></span><div class="notif_info"><p>'+tmp_info+'</div></p>';
                            tmp_html+= '<span class="'+tmp_tag+'"></span><div class="notif_info">'+tmp_info+'</div>';
                            tmp_html+='</div><div class="notification-box-footer"></div>';
                        }


                        tmp_time2 = tmp_time; tmp_duration2 = notif_duration; tmp_fade = 400;
                        
                        if(tmp_duration=="-1"){// notif. duration
                            tmp_duration2= 0;
                        }else{
                            tmp_duration2=tmp_duration*1000;// in seconds
                        }

                        if(tmp_display=="1"){// quick display
                            tmp_fade = 0; tmp_time2 = 0;
                        }else{
                            tmp_time += 1500;
                        }

                        var tmp_arguments = tmp_html + ";;" + tmp_duration2 + ";;" + tmp_fade;
                        //setTimeout(function(){notifications_add(tmp_arguments)},tmp_time2);
                        notifications_add(tmp_arguments);

                        // notifications_browser_title_update(1);
                        tmp_cnt ++;
                }
		    });
            
            if(tmp_id!=0){ notif_lastid = tmp_id; }

            if(notif_nexttime==-1){
            }else{
                setTimeout("notifications('reload')",notif_nexttime*1000);
            }
            $('#notification-nextload').html("<!--"+notif_nexttime+"segs-->");
            notif_cnt ++;

            setTimeout(function(){notifications_browser_title_update("ini end")},notif_titleloadtime);
            setTimeout(function(){notifications_browser_title_update("ini end")},notif_titleloadtime+200);
	    },
	    error: function () {
            notif_nexttime=notif_nexttime+10;
            setTimeout("notifications('reload')",notif_nexttime*1000);
        }

    });

}

    // CLEAR ALL
    function notif_empty(tmp_type) {
        //$(".notification-board").empty();
        $("div").remove(".notification-box-item");
        //notifications_browser_title_update("empty");
        notif_alerts = 0;
        setTimeout(function(){notifications_browser_title_update("empty")},notif_titleloadtime);
        setTimeout(function(){notifications_browser_title_update("empty")},notif_titleloadtime+200);
        // clear notif cnt and page title ref
        notif_closeall = 0;
        //alert("empty: " + tmp_type);
    }

    // CHECK if EXISTS
    function notif_checkup(tmp_id) {
        if(notif_mem[tmp_id]){
            return false;
        }else{
            notif_mem[tmp_id] = 1;
            return true;
        }
    }

    // CLOSE AJAX
    function notifications_actions(tmp_id, tmp_type) {
        var tmp_url = notif_url + "&action=close&id=" + tmp_id;
        if(tmp_type==2){ tmp_url = notif_url + "&action=closeall&id=" + notif_lastid; }
		$.ajax({
			url : tmp_url,
			dataType: "xml",
			success: function (xml) {
                if(tmp_type=="1"){
                    //alert("opening URL: " + tmp_type);
                    window.location.href = tmp_type;
                }else{
                    //alert("closing: " + tmp_url);
                }
            },
		});
    }

    // BROWSER TITLE UPDATE
    function notifications_browser_title_update(tmp_tp) {
        
        notif_count = notif_alerts;
        //notif_count = $(".notification-box-item").length;

        var notif_pagetitle_bak = notif_pagetitle;
        if(notif_count>0){
            notif_pagetitle_bak="(" + notif_count + ") " + notif_pagetitle;
        }
        if(notif_nexttime==-1){
            notif_pagetitle_bak="(off) " + notif_pagetitle_bak;
        }
        document.title = notif_pagetitle_bak;

        if(notif_count>2){
            $('#notification-closeall').show();
            $('#notification-closeall').html(notif_count);
        }else{
            $('#notification-closeall').hide();
        }

        /*var tmp_output="<!-- "+notif_count+" - "+tmp_tp+" -->";
        $('#notification-output').html(tmp_output);*/
    }

    // ADD NEW NOTIFICATION
    function notifications_add(tmp_arguments)  {
        var tmp_Arr = [];
		tmp_Arr = tmp_arguments.split(";;");
        tmp_html = tmp_Arr[0]; tmp_duration = parseInt(tmp_Arr[1]); tmp_fade = parseInt(tmp_Arr[2]);
        $.createNotification({ content: tmp_html, duration: tmp_duration, fadeIn: tmp_fade, })
    }


    // MISC FUNCTIONS
    function notifications_random_string(size){
        var str = "";
        for (var i = 0; i < size; i++){
            str += notifications_random_character();
        }
        return str;
    }
        function notifications_random_character() {
            var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
            return chars.substr( Math.floor(Math.random() * 62), 1);
        }


// JQUERY UI
;(function($) {

	$.notificationOptions = {
		className: '',
		click: function() {},
		content: '',
		duration: 5000,
		fadeIn: 100,
		fadeOut: 100,
		limit: false,
		queue: false,
		slideUp: 200,
		horizontal: 'right',
		vertical: 'top',
        afterShow: function(){},
        afterClose: function(){
            notif_alerts--;
            setTimeout(function(){notifications_browser_title_update("hide")},notif_titleloadtime);
            setTimeout(function(){notifications_browser_title_update("hide")},notif_titleloadtime+200);
        }
	};

	var Notification = function(board, options) {
		var that = this;
		// build notification template
		var htmlElement = $([
			'<div class="notification-box-item ' + options.className + '" style="display:none">',
				options.content,
			'</div>'
		].join(''));
		/*var htmlElement = $([
			'<div class="notification">',
				options.content,
			'</div>'
		].join(''));*/
		// getter for template
		this.getHtmlElement = function() {
			return htmlElement;
		};
		// custom hide
		this.hide = function() {
			htmlElement.addClass('hiding');
			htmlElement.animate({ opacity: .01 }, options.fadeOut, function() {
				var queued = queue.shift();
				if (queued) {
					$.createNotification(queued);
				}
			});
			htmlElement.slideUp(options.slideUp, function() {
				$(this).remove();
                options.afterClose();
			});


		};
		// show in board
		this.show = function() {
			// append to board and show
			htmlElement[options.vertical == 'top' ? 'appendTo' : 'prependTo'](board);
			htmlElement.fadeIn(options.fadeIn, options.afterShow());
            //notifications_browser_title_update("show");
            setTimeout(function(){notifications_browser_title_update("show")},notif_titleloadtime);
            setTimeout(function(){notifications_browser_title_update("show")},notif_titleloadtime+200);
		};
		// set custom click callback
		htmlElement.on('click', function() {
			options.click.apply(that);
		});
		// helper classes to avoid hide when hover
		/*htmlElement.on('mouseenter', function() {
			htmlElement.addClass('hover');
			if (htmlElement.hasClass('hiding')) {
				// recover
				htmlElement.stop(true);
				// reset slideUp, could not find a better way to achieve this
				htmlElement.attr('style', 'opacity: ' + htmlElement.css('opacity'));
				htmlElement.animate({ opacity: 1 }, options.fadeIn);
				htmlElement.removeClass('hiding');
				htmlElement.addClass('pending');
			}
		});
		htmlElement.on('mouseleave', function() {
			if (htmlElement.hasClass('pending')) {
				// hide was pending
				that.hide();
			}
			htmlElement.removeClass('hover');
		});*/
		// close button bind
		htmlElement.children('.close').on('click', function() {
			that.hide();
		});
		if (options.duration) {
			// hide timer
			setTimeout(function() {
				/*if (htmlElement.hasClass('hover')) {
					htmlElement.addClass('pending');
				} else {
					that.hide();
				}*/
                if(htmlElement.css("display")=="block"){// avoid multi-hides for same item
                    that.hide();
                }
			}, options.duration);
		}
		return this;
	};

	var queue = [];

	$.createNotification = function(options) {
		options = $.extend({}, $.notificationOptions, options || {});
		// get notification container (aka board)
		//var board = $('.notification-board.' + options.horizontal + '.' + options.vertical);
        var board = $('.notification-board');
		if (!board.length) {
			//board = $('<div class="notification-board ' + options.horizontal + ' ' + options.vertical + '" />');
            board = $('<div class="notification-board" />');
			board.appendTo('body');
            
            var htmlString = $('.notification-board').html() + '<div id="notification-output"></div><div id="notification-nextload"><!--'+notif_nexttime+'segs--></div><div id="notification-closeall">' + notif_alerts + '</div>';
            $('.notification-board').html(htmlString);
            if(notif_alerts<3){ $('#notification-closeall').hide(); }
            $('#notification-closeall').click(function() {
                notif_empty("btn closeall"); notifications_actions(0, 2);
            });
		}
		if (options.limit && board.children('.notification-box-item:not(.hiding)').length >= options.limit) {
			// limit reached
			if (options.queue) {
				queue.push(options);
			}
			return;
		}
		// create new notification and show
		var notification = new Notification(board, options)
		notification.show(board);
		return notification;
	};

})(jQuery);
