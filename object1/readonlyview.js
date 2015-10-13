$(window).load(function() {
	var shortBannerTitle="";
	var bannerTitle="";
	var isHorizontal=$.cookie('horizontal');
	if(title.length > 50){
		shortBannerTitle = title.substring(0, 50);
		if(title.length > 200){
			bannerTitle=( title.substring(0, 50) + "\n"+title.substring(50,100)+"\n"+title.substring(100, 150)+"\n"+title.substring(150, 200)+"\n"+title.substring(200, title.length));
		}else if(title.length > 150){
			bannerTitle=( title.substring(0, 50) + "\n"+title.substring(50,100)+"\n"+title.substring(100, 150)+"\n"+title.substring(150, title.length));
		}else if(title.length > 100){
			bannerTitle=( title.substring(0, 50) + "\n"+title.substring(50,100) + "\n"+title.substring(100,title.length));
		}else{
			bannerTitle=( title.substring(0, title.length));
		}
		if(title.indexOf(" ") > -1){
			bannerTitle = title;
		}
		
		$("#bannerTitle").html("&nbsp;View "+shortBannerTitle+".......");
		$("#bannerTitle").mouseover(function(){			
			$("#bannerTitle").attr('title',bannerTitle);
		})
	}else{
		$("#bannerTitle").html("&nbsp;View "+title+"....");
	}
	// navigation buttons
	
	$("#back").button({
		icons: {"primary": "ui-icon-back-arrow"},
		label: BACK_LABEL
	}).click(function() {
		window.location.href = GET_BACK_URL();
	});
	
	$("#finish").button({
		icons: {"primary": "ui-icon-save-object"},
		label: FINISH_LABEL
	}).click(function() {
		window.location.href =GET_FINISH_URL();
	});
	
	var verticalContainer = $("#content_object_vertical");
	var verticalButton = $("#content_object_vertical_button");
	var verticalSortable = $("#content_object_vertical_sortable");
	var verticalItems = $("#content_object_vertical_sortable_items");
	
	var horizontalContainer = $("#content_object_horizontal");
	var horizontalButton = $("#content_object_horizontal_button");
	var horizontalSortable = $("#content_object_horizontal_sortable");
	var horizontalItems = $("#content_object_horizontal_sortable_items");
	
	
	$("#section").change(function() {
	  window.location.href = GET_SECTION_URL({"currentSection": $("#section").val()});
	});
	
	// add a vertical page sortable
	var addVerticalPage = function(pageId,index,pageTitle, pageName, pageThumbnail) {
	
		var item = $("<div></div>").attr({
			"class": "content_object_vertical_sortable_item",
			"id": "vertical_item_" + pageId
		});		
		var container = $("<table></table>").attr({
			"class": "content_object_page",
			"id":"table_displayed"
		});
		
		container.mouseenter(function() {
			$(this).addClass("content_object_page_over");
		});
		
		container.mouseleave(function() {
			$(this).removeClass("content_object_page_over");
		});
		
		var name = $("<div></div>").attr({
			"class": "content_object_page_name"
		}).text(' ');
		
		var title = $("<div></div>").attr({
			"class": "content_object_page_title"
		}).html(pageTitle);
		
		title.html("<p>"+title.text()+"</p>");
		
		var handle = $("<div></div>").attr({
			"class": "content_object_page_handle"
		});
		
		var body = $("<div></div>").attr({
		    "class": "content_object_page_body"
		});

		var tr = $("<tr></tr>");
		
		//View Read only action
		var viewAction = function(item, dataId, dataName) {
    		window.location.href = GET_PAGE_VIEW_URL({"pageId": dataId});
    	}
		
        tr.mouseenter(function(event) {
		   if ($(".ui-sortable-helper").size()) { // sorting
		       return;
		}
		    
   		$("tr td:nth-child(2)").click(function(event) {
       	    if (!horizontalContainer.is(":visible")){
       	    	viewAction(item, pageId, pageName);
   			}
       	});

   		$("tr td:nth-child(3)").click(function(event) {
    		if (!horizontalContainer.is(":visible")){
    			viewAction(item, pageId, pageName);
    		}
        });
   		
		});
        
        body.append(title);				
		var tdHandle = $("<td style='width: 5%;'></td>").css({width: "3%;"});//.append(handle);
		var tdSNo = $("<td align='left' id='snumb' style='width: 5%;'></td>").css({width: "7%;"}).append(index);		
		var tdBody = $("<td width: '90%;'></td>").append(body);
//		var tdTitle = $("<td></td>").append(name);
		
		tr.append(tdHandle);
		tr.append(tdSNo);
		tr.append(tdBody);
//		tr.append(tdTitle);
		
		container.append(tr);

		item.append(container);
		
		item.data({
		   "pageId": pageId 
		});
		
		verticalItems.append(item);
	};
	
	// add a horizontal page sortable
	var addHorizontalPage = function(pageId, pageTitle,pageName,pageThumbnail) {

		if(pageTitle==null){
			pageTitle="<p>"+pageName+"</p>";
		}
		
		var item = $("<td></td>").attr({
			"class": "content_object_horizontal_sortable_item",
			"id": "horizontal_item_" + pageId
		});
		
		var container = $("<div></div>").attr({
			"class": "content_object_page",
			"id":"table_displayed"
		});
		
		container.mouseenter(function() {
			$(this).addClass("content_object_page_over");
		});
		
		container.mouseleave(function() {
			$(this).removeClass("content_object_page_over");
		});
		
		var title = $("<div></div>").attr({
		    "class": "content_object_page_title_hr"
		}).html(pageTitle);
		
		var shortText = title.text()
	    .substring(0, 30);
	    
		if(title.text().length > 30){
			shortText=shortText+"...";
		}
		
		title.html(shortText);		

		var handle = $("<div></div>");
		
		var body = $("<div></div>").attr({
		    "class": "content_object_page_body"
		});
		
		var image;
		if (pageThumbnail) {
			image = $("<img></img>").attr({
				"class": "content_object_page_thumbnail",
				"src": pageThumbnail
			});
		} else {
			image = $("<div></div>").attr({
				"class": "content_object_page_thumbnail"
			});
		}
		
		body.append(image);
		
		//View Read only action
		var viewAction = function(item, dataId, dataName) {
    		window.location.href = GET_PAGE_VIEW_URL({"pageId": dataId});
    	}
		
		body.mouseenter(function(event) {
		    if ($(".ui-sortable-helper").size()) { // sorting
		        return;
		    }
		    
		body.click(function(event) {
			viewAction(item, pageId, pageName);
        	});
		});
		
		container.append(title);
		container.append(handle);
		container.append(body);

		item.append(container);
		
		item.data({
		   "pageId": pageId 
		});
		
		horizontalItems.append(item);
	};
	
	// add both vertical and horizontal sortable pages
	var addPage = function(pageId,index,pageTitle,pageName, pageThumbnail) {

	    addVerticalPage.apply(this, [pageId,index,pageTitle, pageName,pageThumbnail]);
	    addHorizontalPage.apply(this, [pageId,pageTitle, pageName,pageThumbnail]);
	};
	
	// add all pages
	$.each(PAGES, function(index, page) {
		index++;		
		addPage.apply(this, [page.id,index,page.title,page.name]);
	});
	
	verticalSortable.sortable({
		items: ".content_object_vertical_sortable_item",
		handle: ".content_object_page_handle",
		axis: "y",
		cursor: "move",
		placeholder: 'placeholder',
		stop: function(event, ui) {
		    var item = ui.item;
		    
		    var pageId = item.data("pageId"); 
		    var pageIndex = item.prevAll().length;
		    
		    moveAction(item, pageId, pageIndex);
		},
		update: function(event, ui){
			var i=1;
            $('#table_displayed tr').each(function(){            	
            $(this).children('td:eq(1)').html(i);
            i++;
            })
		}
	}).disableSelection();
	
	horizontalSortable.sortable({
		items: ".content_object_horizontal_sortable_item",
		handle: ".content_object_page_handle",
		axis: "x",
		cursor: "move",
		stop: function(event, ui) {
		    var item = ui.item;
		    
		    var pageId = item.data("pageId"); 
		    var pageIndex = item.prevAll().length;
		    
		    moveAction(item, pageId, pageIndex);
		},
		update: function(event, ui){
			var i=1;
            $('#table_displayed tr').each(function(){            	
            $(this).children('td:eq(1)').html(i);
            i++;
            })
		}
	});
	/*changes made for 732*/
	if(isHorizontal=='true'){
		verticalContainer.hide();
		horizontalContainer.show();
		verticalButton.removeClass("content_object_vertical_button_selected");
	    horizontalButton.addClass("content_object_horizontal_button_selected");
		$.removeCookie('horizontal');
	}else{
	horizontalContainer.hide();
	verticalContainer.show();
	verticalButton.addClass("content_object_vertical_button_selected");
    horizontalButton.removeClass("content_object_horizontal_button_selected");
	}
	
	verticalButton.click(function() {
		var pageThumbnail;
	    horizontalContainer.hide();
	
	    verticalContainer.show();
	 
	    verticalButton.addClass("content_object_vertical_button_selected");
	    horizontalButton.removeClass("content_object_horizontal_button_selected");
	    
	    var i=1;
        $('#table_displayed tr').each(function(){            	
            $(this).children('td:eq(1)').html(i);
            i++;
        })
        location.reload();
	});
	
	horizontalButton.click(function(e) {
		 e.preventDefault();
		$.cookie('horizontal', 'true');
		 $.cookie.raw = true;
	    verticalContainer.hide();
	    horizontalContainer.show();
    	verticalButton.removeClass("content_object_vertical_button_selected");
	    horizontalButton.addClass("content_object_horizontal_button_selected");
	    location.reload();
	   
	});
});