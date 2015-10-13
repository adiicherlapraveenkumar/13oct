$(window).load(function() {
      $("#back").button({
            icons: {"primary": "ui-icon-back-arrow"},
            label: BACK_LABEL
      }).click(function() {
            window.location.href = GET_BACK_URL();
      });
      
      $("#continue").button({
            icons: {"secondary": "ui-icon-forward-arrow"},
            label: CONTINUE_LABEL
      }).click(function() {
        var masterId = $("#selected_master_content_object").val();
        if (masterId != null && masterId.length) {
          document.location.href = GET_MASTER_SUBMIT_URL({"id": masterId});
        } else {
              var form = $(this).parents('form:first');
              form.submit();
            }
      });
      
      if(!CREATE_MASTER){
      // table configuration
      var table = $("#sample_content_objects_table").dataTable({
            "bJQueryUI": true,
            "bDeferRender": true,
            "sScrollY": TABLE_SCROLL_HEIGHT + "px",
            "bScrollCollapse": true, 
            "bPaginate": false,
            "oSearch": {"sSearch": "", "bSmart": true},
            "bSortClasses": false,
            "aoColumns": [
                  {"sTitle": TABLE_RADIO_COLUMN_NAME, "sType": "html", "bSortable": false, "bSearchable": false, "bSortable": false, "sWidth": TABLE_RADIO_COLUMN_WIDTH, "sClass": "tableRadio"}, // icon column
                  {"sTitle": TABLE_ID_COLUMN_NAME, "sType": "string", "bSearchable": true, "sWidth":TABLE_ID_COLUMN_WIDTH}, // id column
                  { "sTitle": TABLE_TITLE_COLUMN_NAME, "sType": "string","bSearchable": true, "bSortable": true,"sWidth": TABLE_TITLE_COLUMN_WIDTH_MASTER}, // name column
                  {"sTitle": TABLE_PATH_COLUMN_NAME, "sType": "string", "bSearchable": false, "bVisible": false}, // path column
            ],
            "aaSorting": [
                  [TABLE_TITLE_COLUMN_INDEX, "asc"]
            ],
            "aaData": TABLE_DATA,
            "oLanguage": {
            "sEmptyTable": TABLE_NO_DATA_MESSAGE,
            "sSearch": ""
        }
      });
      }else{
    	  TOOLTIP_ITEM_COLUMN_INDEX = 1;
    	  var table = $("#sample_content_objects_table").dataTable({
              "bJQueryUI": true,
              "bDeferRender": true,
              "sScrollY": TABLE_SCROLL_HEIGHT + "px",
              "bScrollCollapse": true, 
              "bPaginate": false,
              "oSearch": {"sSearch": "", "bSmart": true},
              "bSortClasses": false,
              "aoColumns": [
                  {"sTitle": TABLE_ID_COLUMN_NAME, "sType": "string", "bSearchable": false, "bVisible": false}, // id column
                  {"sTitle": TABLE_RADIO_COLUMN_NAME, "sType": "html", "bSortable": false, "bSearchable": false, "bSortable": false, "sWidth": TABLE_RADIO_COLUMN_WIDTH, "sClass": "tableRadio"}, // icon colum
                  {"sTitle": TABLE_TITLE_COLUMN_NAME, "sType": "string","bSearchable": true, "bSortable": true,"sWidth": TABLE_TITLE_COLUMN_WIDTH}, // name column
                  {"sTitle": TABLE_PATH_COLUMN_NAME, "sType": "string", "bSearchable": false, "bVisible": false}, // path column
              ],
              "aaSorting": [
                    [TABLE_TITLE_COLUMN_INDEX, "asc"]
              ],
              "aaData": TABLE_DATA,
              "oLanguage": {
              "sEmptyTable": TABLE_NO_DATA_MESSAGE,
              "sSearch": ""
          }
        });
      }
      $("#sample_content_objects_table_wrapper").css("min-height", "0px");
      
      $("#sample_content_objects_table_filter").prepend(
    $("<span></span>").attr({
      "class": "ui-icon-search-object"
    }).css({
      "float": "left",
      "position": "relative",
      "top": "1px",
      "left": "-5px"
    })
  ).css({width: "auto"});
  
  if (!CREATE_MASTER) {
    var masterCheckbox = $("<input></input>").attr({
      "type": "checkbox"
    });
 /*   
	if (MASTER_SELECTED) {
      masterCheckbox.attr({
        "checked": "checked"
      });
    }
    
	masterCheckbox.change(function() {
      if (masterCheckbox.is(":checked")) {
        document.location.href = GET_SHOW_MASTER_URL();
      } else {
       document.location.href = GET_HIDE_MASTER_URL();
      }
   });
      
    */
    $("#sample_content_objects_table_filter").parent().prepend(
      $("<div></div>").css({
        "float": "left"
      }).append(
      //  masterCheckbox,
        $("<span></span>").css({
          "color": "white",
          "position": "relative",
          "top": "1px",
          "left": "10px",
        })
      )
    );
  }
      
      // clear the tooltip and highlight
      var clear = function(item) {
            var items = item.siblings().add(item);
            
            // unhighlight
            items.removeClass("highlight");
            
            var tooltipItem = $(items.get(TOOLTIP_ITEM_COLUMN_INDEX));

            // clear tooltip
            var tooltip = tooltipItem.data("tooltipsy");
            if (tooltip) { 
                  try { tooltip.hide(); }
                  catch (e) {}

                  try { tooltip.destroy(); }
                  catch (e) {} 
            }
      };
      
      // action for selecting 
      var selectAction = function(item, row, dataId, dataName, dataPath) {
        if (typeof dataId == "string") {
        	  $("#selected_master_content_object").val(dataId);
        } else {
              $("#selected_sample_content_object").val(dataId);
        }
      }
      
      // action for previewing
      var previewAction = function(item, row, dataId, dataName, dataPath) {
            window.open(dataPath, "_blank");
      } 
      
      $("td", table.fnGetNodes()).click(function(event) {
          $("td.selected input:radio", table.fnGetNodes()).attr('checked',false);
    	  $("td.selected", table.fnGetNodes()).removeClass("selected");
            
            var item = $(this);
            var items = item.siblings().add(item);
            
            var row = item.parents("tr").first();
            
            // process data
            
            var data = table.fnGetData(row.get(0));
            
            var dataId = data[TABLE_ID_COLUMN_INDEX];
            var dataName = data[TABLE_TITLE_COLUMN_INDEX];
            var dataPath = data[TABLE_PATH_COLUMN_INDEX];
            
            items.addClass("selected");
            items.find("input:radio").attr('checked',true);
            
            selectAction(item, row, dataId, dataName, dataPath);
      }).mouseenter(function(event) {
            var item = $(this);
            var items = item.siblings().add(item);
            
            var row = item.parents("tr").first();
            
            // process data
            
            var data = table.fnGetData(row.get(0));
            
            var dataId = data[TABLE_ID_COLUMN_INDEX];
            var dataName = data[TABLE_TITLE_COLUMN_INDEX];
            var dataPath = data[TABLE_PATH_COLUMN_INDEX];
            
            var relatedTarget = $(event.relatedTarget);
            var relatedTargets = relatedTarget.parents().add(relatedTarget); 
            
            var tooltip;
            
            var tooltipItem = $(items.get(TOOLTIP_ITEM_COLUMN_INDEX));
            
            // dont do anything if the mouse entrance is from the tooltip for this row or from another item in this row
            
            tooltip = tooltipItem.data("tooltipsy");
            if (tooltip) {
                  try {
                        if (relatedTargets.index($(tooltip.$tip)) >= 0) { return; }
                  } catch (e) {}
            }
            
            var found = false;
            items.each(function(index, element) {
                  if (relatedTargets.index(element) >= 0) { 
                        found = true;
                        return false; 
                  }
            });
            if (found) {return; }
            
            // highlight
            items.addClass("highlight");
            
            // create and show tooltip
            
            tooltipItem.tooltipsy({
                  offset: [-1, 0],
                  className: "",
                  showEvent: null,
                  hideEvent: null,
                  content: function() {
                        var content = $("<div></div>");
                        
                        // edit button
                        var preview = $("<button></button>").button({
                              icons: {"primary": "ui-icon-preview-object"},
                              label: PREVIEW_LABEL
                        }).addClass("link_button").css({
                              "background": "none",
                              "borderWidth": "0px"
                        }).click(function() {
                              previewAction(item, row, dataId, dataName, dataPath);
                        });
                        
                        content.append($("<div></div>").append(preview));
                        
                        return Com.Toolpanel.create(content);
                  }, 
                  show: function(event, element) {
                        element.show();
                        
                        var offset = tooltipItem.offset();
                        
                        element.css({
                              "left": (offset.left + tooltipItem.outerWidth() + TOOLTIP_LEFT_OFFSET) + "px",
                              "top": (offset.top + tooltipItem.outerHeight() / 2 - element.outerHeight() / 2)  + "px"
                        });
                  }
            });
            
            tooltip = tooltipItem.data("tooltipsy");
            if (tooltip) { 
                  try { 
                        tooltip.show(); 
                        
                        $(tooltip.$tip).mouseleave(function(event) {
                              var relatedTarget = $(event.relatedTarget);
                              var relatedTargets = relatedTarget.parents().add(relatedTarget);
                              
                              // dont do anything if the mouse departure is into another item within this row
                              var found = false;
                              items.each(function(index, element) {
                                    if (relatedTargets.index(element) >= 0) { 
                                          found = true;
                                          return false; 
                                    }
                              });
                              if (found) {return; }

                              clear(item);
                        });
                  } catch (e) {}
            }
      }).mouseleave( function(event) {
            var item = $(this);
            var items = item.siblings().add(item);
            
            var tooltipItem = $(items.get(TOOLTIP_ITEM_COLUMN_INDEX));
            
            var relatedTarget = $(event.relatedTarget);
            var relatedTargets = relatedTarget.parents().add(relatedTarget);
            
            // dont do anything if the mouse departure is into another item within this row or the tooltip for this row
            
            var tooltip = tooltipItem.data("tooltipsy");
            if (tooltip) {
                  try {
                        if (relatedTargets.index($(tooltip.$tip)) >= 0) { return; }
                  } catch (e) {}
            }

            var found = false;
            items.each(function(index, element) {
                  if (relatedTargets.index(element) >= 0) { 
                        found = true;
                        return false; 
                  }
            });
            if (found) {return; }
            
            clear(item);
      });
      
      if (ERROR){
  		if(!CREATE_MASTER){
  			showErrorMessage("<font size='4'><b>Error!</b></font><br>Please select a Master SCO.");
  		}else{
  			showErrorMessage("<font size='4'><b>Error!</b></font><br>Please select a Root SCO.");
  		}
	  }
});