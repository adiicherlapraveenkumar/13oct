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
		
		$("#bannerTitle").html("&nbsp;Edit "+shortBannerTitle+".......");
		$("#bannerTitle").mouseover(function(){			
			$("#bannerTitle").attr('title',bannerTitle);
		})
	}else{
		$("#bannerTitle").html("&nbsp;Edit "+title+"....");
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
		window.location.href = GET_FINISH_URL();
	});
	
	var verticalContainer = $("#content_object_vertical");
	var verticalButton = $("#content_object_vertical_button");
	var verticalSortable = $("#content_object_vertical_sortable");
	var verticalItems = $("#content_object_vertical_sortable_items");
	
	var horizontalContainer = $("#content_object_horizontal");
	var horizontalButton = $("#content_object_horizontal_button");
	var horizontalSortable = $("#content_object_horizontal_sortable");
	var horizontalItems = $("#content_object_horizontal_sortable_items");
	
	// create new page button
	$("#new").button({
        icons: {"primary": "ui-icon-new-object"},
        label: NEW_LABEL
    }).click(function() {
    	window.location.href = GET_NEW_URL();
	});
	
	$("#checkIn").button({
		label: "Checkin"
	}).click(function() {
		window.location.href= CHECKED_IN_URL();
	}).css({
		"height": "20px",
		"top": "1px",
		"textAlign": "center"
		
	});

	
	// clear all pages button
	$("#clear").button({
        icons: {"primary": "ui-icon-clear-object"},
        label: CLEAR_LABEL
    }).click(function() {
    	var len=verticalItems.has('tr').length;
    	
    	if (len > 0){
        	var dialog = $("<div></div>").dialog({
                autoOpen: false,
                modal: true,
                width: "auto",
                position: ["center", "middle"],
    			draggable: false,
    			resizable: false,
                buttons: [
                    {
                        text: CLEAR_CONFIRM_LABEL, 
                        click: function() {
    						verticalItems.empty();
    						horizontalItems.empty();

    						$.get(GET_CLEAR_URL());

    						$(this).dialog("close");
                        }
                    },
                    {
                        text: CLEAR_CANCEL_LABEL,
                        click: function() {
                            $(this).dialog("close");
                        }
                    } 
                ]
            });

    		dialog.append(
    			$("<div></div>").css({
    				"padding": CLEAR_CONFIRMATION_PADDING + "px",
    				"maxWidth": CLEAR_CONFIRMATION_MAX_WIDTH,
    				"textAlign": "center"
    			}).text(
    				CLEAR_CONFIRMATION_MESSAGE
    			)
    		);
    	}else{
        	var dialog = $("<div></div>").dialog({
                autoOpen: false,
                modal: true,
                width: "auto",
                position: ["center", "middle"],
    			draggable: false,
    			resizable: false,
                buttons: [

                    {
                        text: "OK",
                        click: function() {
                            $(this).dialog("close");
                        }
                    } 
                ]
            });

    		dialog.append(
    			$("<div></div>").css({
    				"padding": CLEAR_CONFIRMATION_PADDING + "px",
    				"maxWidth": CLEAR_CONFIRMATION_MAX_WIDTH,
    				"textAlign": "center"
    			}).text(
    					CLEAR_CONFIRMATION_MESSAGE_NO 
    			)
    		);
    	}
		dialog.dialog("open");
	});
	
	// create new page button
	$("#preview").button({
        icons: {"primary": "ui-icon-preview-object"},
        label: PREVIEW_LABEL
    }).click(function() {
    	window.open(GET_PREVIEW_URL(), "_blank");
	});
	
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
		}).text(pageName);
		
		
		var title = $("<div></div>").attr({
			"class": "content_object_page_title"
		}).html(pageTitle);
		
		title.html("<p>"+title.text()+"</p>");
		
		var handle = $("<div></div>").attr({
			"class": "content_object_page_handle"
		}).append(
		    $("<span></span>").attr({
    			"class": "content_object_page_handle_icon"
    		})
		);
		
		var body = $("<div></div>").attr({
		    "class": "content_object_page_body"
		});

		var tr = $("<tr></tr>");
		
		// clear the tooltip 
    	var clear = function() {
    		// clear tooltip
    		var tooltip = tr.data("tooltipsy");
    		if (tooltip) { 
    			try { tooltip.hide(); }
    			catch (e) {}

    			try { tooltip.destroy(); }
    			catch (e) {} 
    		}
    	};
    	
    	// action for editing
    	var editAction = function(item, dataId, dataName) {
    	    clear();
    	    
    		window.location.href = GET_PAGE_EDIT_URL({"pageId": dataId});
    	}

    	// action for duplicating
    	var duplicateAction = function(item, dataId, dataName) {
            clear();
            
            window.location.href = GET_PAGE_DUPLICATE_URL({"pageId": dataId});
    	}

    	// action for removal
    	var removeAction = function(item, dataId, dataName) {
            clear();

    		var dialog = $("<div></div>").dialog({
                autoOpen: false,
                modal: true,
                width: "auto",
                position: ["center", "middle"],
    			draggable: false,
    			resizable: false,
                buttons: [
                    {
                        text: REMOVE_CONFIRM_LABEL, 
                        click: function() {
    						item.remove();
    						verticalSortable.sortable("refresh");
    						
    						$("#horizontal_item_" + dataId).remove();
    						horizontalSortable.sortable("refresh");

    						$.get(GET_PAGE_REMOVE_URL({"pageId": dataId}));

    						$(this).dialog("close");
    						var i=1;
    			            $('#table_displayed tr').each(function(){            	
    			            $(this).children('td:eq(1)').html(i);
    			            i++;
    			            })
                        }
                    },
                    {
                        text: REMOVE_CANCEL_LABEL,
                        click: function() {
                            $(this).dialog("close");
                        }
                    } 
                ]
            });

    		dialog.append(
    			$("<div></div>").css({
    				"padding": REMOVE_CONFIRMATION_PADDING + "px",
    				"maxWidth": REMOVE_CONFIRMATION_MAX_WIDTH,
    				"textAlign": "center"
    			}).text(
    				Com.String.sprintf(REMOVE_CONFIRMATION_MESSAGE, dataName)
    			)
    		);

    		dialog.dialog("open");
    	}
		
    	tr.mouseenter(function(event) {
		    if ($(".ui-sortable-helper").size()) { // sorting
		        return;
		    }
		    
		    // create and show tooltip
		    
		    var relatedTarget = $(event.relatedTarget);
		    
		    tooltip = tr.data("tooltipsy");
    		if (tooltip) {
    			try {
    				if (relatedTarget.is($(tooltip.$tip)) || ($(tooltip.$tip).find(relatedTarget).length)) { return; }
    			} catch (e) {}
    		}

    		tr.tooltipsy({
    			offset: [-1, 0],
    			className: "",
    			showEvent: null,
    			hideEvent: null,
    			content: function() {
    				var content = $("<div></div>");

    				// edit button
            		var edit = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-new-object"},
            			label: EDIT_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			editAction(item, pageId, pageName);
            		});

            		// duplicate button
            		var duplicate = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-duplicate-object"},
            			label: DUPLICATE_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			duplicateAction(item, pageId, pageName);
            		});

            		// remove button
            		var remove = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-delete-object"},
            			label: REMOVE_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			removeAction(item, pageId, pageName);
            		});

            		var buttons = $("<div></div>").attr({
            			"class": "content_object_page_buttons"
            		});

            		buttons.append($("<div></div>").append(edit));
            		buttons.append($("<div></div>").append(duplicate));
            		buttons.append($("<div></div>").append(remove));

    				content.append(buttons);

    				return Com.Toolpanel.create(content);
    			}, 
    			show: function(event, element) {
    				element.show();

    				var offset = tr.offset();

    				element.css({
    					"left": (offset.left + tr.outerWidth() + VERTICAL_PAGE_TOOLTIP_LEFT_OFFSET) + "px",
    					"top": (offset.top + tr.outerHeight() / 2 - element.outerHeight() / 2)  + "px"
    				});
    			}
    		});
    		
    		//dcat-732
    		$("tr td:nth-child(2)").click(function(event) {
        	   // editAction(item, pageId, pageName);
        	    if (!horizontalContainer.is(":visible")){
    				editAction(item, pageId, pageName);
    			}
        	});
    		$("tr td:nth-child(3)").click(function(event) {
        	   // editAction(item, pageId, pageName);
    			if (!horizontalContainer.is(":visible")){
    				editAction(item, pageId, pageName);
    			}
        	});
    		
    		$("tr td:nth-child(4)").click(function(event) {
         	   // editAction(item, pageId, pageName);
     			if (!horizontalContainer.is(":visible")){
     				editAction(item, pageId, pageName);
     			}
         	});

    		tooltip = tr.data("tooltipsy");
    		if (tooltip) { 
    			try { 
    				tooltip.show(); 

    				$(tooltip.$tip).mouseleave(function(event) {
    					var relatedTarget = $(event.relatedTarget);

            			if (relatedTarget.is(tr) || (tr.find(relatedTarget).length)) {
                            return;
                        }

                        clear();
    				});
    			} catch (e) {}
    		}
		}).mouseleave( function(event) {
        	var relatedTarget = $(event.relatedTarget);

			if (relatedTarget.is($(tooltip.$tip)) || ($(tooltip.$tip).find(relatedTarget).length)) {
                return;
            }

            clear();
        });
        
        body.append(title);				
		var tdHandle = $("<td style='width: 5%;'></td>").css({width: "3%;"}).append(handle);
		var tdSNo = $("<td align='left''width: 5%;' id='snumb'></td>").css({width: "7%;"}).append(index);		
		var tdBody = $("<td style='width: 50%;'></td>").append(body);
		var tdLayout = $("<td></td>").append(name);
		var tdTitle = $("<td></td>").css({"width":"40%","text-align":"left"}).append(name);
		
		tr.append(tdHandle);
		tr.append(tdSNo);
		tr.append(tdBody);
	//	tr.append(tdLayout);
		tr.append(tdTitle);
		
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
		
		var name = $("<div></div>").attr({
			"class": "content_object_page_name"
		}).css({"text-align":"center"}).text(pageName);
		
		var shortText = name.text()
	    .substring(0, 30);
	    
		if(name.text().length > 30){
			shortText=shortText+"...";
		}
		
		name.html(shortText);	

		var handle = $("<div></div>").attr({
			"class": "content_object_page_handle"
		}).append(
		    $("<span></span>").attr({
    			"class": "content_object_page_handle_icon"
    		})
		);
		var namediv = $("<div></div>").attr({
		    "class": "content_object_page_name_hor"
		});
		var body = $("<div></div>").attr({
		    "class": "content_object_page_body"
		}).css({"height":"200px"});
		namediv.append(name);
		var image;
		/***
		 * Test Variables
		 * 1.AGRGOS DIRECT URL
		 * 2.PROD DIRECT URL
		 * 3.PPE DIRECT URL
		 * 4.SERVER URL WITHOUT q param
		 * 5.SERVER URL WITH q param
		 * ACTIVE --> 5.SERVER URL WITH q param.
		 */
		var appLocation=location.host;
		/**PPE AGRGOS DIRECT URL*/		
//		var urlTo="https://amuat.pearson.com/cleartrust/jsp/LoginFrame.jsp?appId=205&CT_ORIG_URL=http://dcatppe.pearson.com/authored/digitalpath/pearson_standard/baserootsco/M909158/player.html?q=d647cd08-6680-4e3b-8ac6-1761bb2f6841&ct_orig_uri=http://dcatppe.pearson.com/authored/digitalpath/pearson_standard/baserootsco/M909158/player.html?q=d647cd08-6680-4e3b-8ac6-1761bb2f6841";
//		var ENU = encodeURIComponent(urlTo);
		/**PROD DIRECT URL*/				
//		var urlTo="dcat.pearson.com/authored/digitalpath/pearson_standard/baserootsco/M845718/player.html";
//		var ENU = encodeURIComponent(urlTo);
		/**PPE DIRECT URL*/		
//		var urlTo="dcatppe.pearson.com/authored/digitalpath/pearson_standard/baserootsco/M863786/player.html";
//		var ENU = encodeURIComponent(urlTo);
		/**SERVER URL WITHOUT q param*/	
//		var preview=appLocation+play;
//		var ENU = encodeURIComponent(preview);
//		console.log("Preview Thumbnail:"+preview);
		/**SERVER URL WITH q param*/	
		var previewQ=appLocation+previewShot;
		var ENU = encodeURIComponent(previewQ);
		console.log("Preview Shot:"+previewQ);
		
		var url="url="+ENU;
//		var testLocation=appLocation+"/dcatweb/home/index";
//		var testLocation="dcat.pearson.com"+"/dcatweb/home/index";
//		var url="url="+testLocation;
		$.ajax({
			url: GET_MD5_SUM_URL({"url":url}),
			async: false,
			error:function(errorStatus) {
				if((errorStatus.status==200)||(errorStatus.status>=300)){
					location.reload(); 				
				}
			},
			success: function(token) {	
				finalURL = "https://api.url2png.com/v6/"+screenshot+"/"+ token+"/png/?"+url;
				image = $("<img></img>").attr({
				"class": "content_object_page_thumbnail",
				"src" : finalURL
				});
				
			}});
		
		body.append(image);
		
		// clear the tooltip 
    	var clear = function() {
    		// clear tooltip
    		var tooltip = body.data("tooltipsy");
    		if (tooltip) { 
    			try { tooltip.hide(); }
    			catch (e) {}

    			try { tooltip.destroy(); }
    			catch (e) {} 
    		}
    	};
    	
    	// action for editing
    	var editAction = function(item, dataId, dataName) {
    	    clear();
    	    
    		window.location.href = GET_PAGE_EDIT_URL({"pageId": dataId});
    	}

    	// action for duplicating
    	var duplicateAction = function(item, dataId, dataName) {
            clear();
            
            window.location.href = GET_PAGE_DUPLICATE_URL({"pageId": dataId});
    	}

    	// action for removal
    	var removeAction = function(item, dataId, dataName) {
            clear();

    		var dialog = $("<div></div>").dialog({
                autoOpen: false,
                modal: true,
                width: "auto",
                position: ["center", "middle"],
    			draggable: false,
    			resizable: false,
                buttons: [
                    {
                        text: REMOVE_CONFIRM_LABEL, 
                        click: function() {
    						item.remove();
    						horizontalSortable.sortable("refresh");
    						
    						$("#vertical_item_" + dataId).remove();
    						verticalSortable.sortable("refresh");

    						$.get(GET_PAGE_REMOVE_URL({"pageId": dataId}));
    						
    						$(this).dialog("close");
    						
    						var i=1;
    			            $('#table_displayed tr').each(function(){            	
	    			            $(this).children('td:eq(1)').html(i);
	    			            i++;
    			            })
                        }
                    },
                    {
                        text: REMOVE_CANCEL_LABEL,
                        click: function() {
                            $(this).dialog("close");
                        }
                    } 
                ]
            });

    		dialog.append(
    			$("<div></div>").css({
    				"padding": REMOVE_CONFIRMATION_PADDING + "px",
    				"maxWidth": REMOVE_CONFIRMATION_MAX_WIDTH,
    				"textAlign": "center"
    			}).text(
    				Com.String.sprintf(REMOVE_CONFIRMATION_MESSAGE, dataName)
    			)
    		);

    		dialog.dialog("open");
    	}
		
		body.mouseenter(function(event) {
		    if ($(".ui-sortable-helper").size()) { // sorting
		        return;
		    }
		    
		    // create and show tooltip
		    
		    var relatedTarget = $(event.relatedTarget);
		    
		    tooltip = body.data("tooltipsy");
    		if (tooltip) {
    			try {
    				if (relatedTarget.is($(tooltip.$tip)) || ($(tooltip.$tip).find(relatedTarget).length)) { return; }
    			} catch (e) {}
    		}

    		body.tooltipsy({
    			offset: [-1, 0],
    			className: "",
    			showEvent: null,
    			hideEvent: null,
    			content: function() {
    				var content = $("<div></div>");

    				// edit button
            		var edit = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-new-object"},
            			label: EDIT_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			editAction(item, pageId, pageName);
            		});

            		// dulicate button
            		var duplicate = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-duplicate-object"},
            			label: DUPLICATE_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			duplicateAction(item, pageId, pageName);
            		});

            		// remove button
            		var remove = $("<button></button>").addClass("link_button").button({
            			icons: {"primary": "ui-icon-delete-object"},
            			label: REMOVE_LABEL
            		}).css({
            			"background": "none",
            			"borderWidth": "0px"
            		}).click(function() {
            			removeAction(item, pageId, pageName);
            		});

            		var buttons = $("<div></div>").attr({
            			"class": "content_object_page_buttons"
            		});

            		buttons.append($("<div></div>").append(edit));
            		buttons.append($("<div></div>").append(duplicate));
            		buttons.append($("<div></div>").append(remove));

    				content.append(buttons);

    				return Com.Toolpanel.create(content);
    			}, 
    			show: function(event, element) {
    				element.show();

    				var offset = body.offset();

    				element.css({
    					"left": (offset.left + body.outerWidth() + HORIZONTAL_PAGE_TOOLTIP_LEFT_OFFSET) + "px",
    					"top": (offset.top + body.outerHeight() / 2 - element.outerHeight() / 2)  + "px"
    				});
    			}
    		});
    		
    		body.click(function(event) {
        	    editAction(item, pageId, pageName);
        	});

    		tooltip = body.data("tooltipsy");
    		if (tooltip) { 
    			try { 
    				tooltip.show(); 

    				$(tooltip.$tip).mouseleave(function(event) {
    					var relatedTarget = $(event.relatedTarget);

            			if (relatedTarget.is(body) || (body.find(relatedTarget).length)) {
                            return;
                        }

                        clear();
    				});
    			} catch (e) {}
    		}
		}).mouseleave( function(event) {
        	var relatedTarget = $(event.relatedTarget);

			if (relatedTarget.is($(tooltip.$tip)) || ($(tooltip.$tip).find(relatedTarget).length)) {
                return;
            }

            clear();
        });
		
		container.append(title);
		container.append(handle);
		container.append(body);
		container.append(namediv);
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
	
	// action for moving
	var moveAction = function(item, dataId, dataIndex) {
        $.get(GET_PAGE_MOVE_URL({"pageId": dataId, "pageIndex": dataIndex}));
        
        if (!verticalContainer.is(":visible")) {
            var verticalItem = $("#vertical_item_" + dataId);
		    var verticalChildren = verticalItem.parent().children();
		    if (dataIndex >= (verticalChildren.length - 1)) {
		        verticalItem.parent().append(verticalItem);
		    } else {
		        $(verticalChildren[dataIndex]).before(verticalItem);
		    }
		    verticalSortable.sortable("refresh");
        }
        
        if (!horizontalContainer.is(":visible")) {
		    var horizontalItem = $("#horizontal_item_" + dataId);
		    var horizontalChildren = horizontalItem.parent().children();
		    if (dataIndex >= (horizontalChildren.length - 1)) {
		        horizontalItem.parent().append(horizontalItem);
		    } else {
		        $(horizontalChildren[dataIndex]).before(horizontalItem);
		    }
		    horizontalSortable.sortable("refresh");
		}
	};
	
	verticalSortable.sortable({
		items: ".content_object_vertical_sortable_item",
		handle: ".content_object_page_handle",
		axis: "y",
		cursor: "move",
		//for SAR 968
		placeholder: "sortable-placeholder",
	
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

	if (PAGE_CREATED){		
		showConfirmationMessage("<font size='4'><b>Success!</b></font><br>Your new page has been saved.");	
	}
});

