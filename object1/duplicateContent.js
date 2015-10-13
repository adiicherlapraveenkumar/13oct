var upperDiv=$("<div></div>");
var keywordsVar=[];
var showPopup= false;
var keywordAttributesLength;
var validKeyword = true;
var finalLength;
var keywordReplacementValue;
var keywordValue;

$(window).load(function() {
	
	$("#content_object_grade_co").multiselect();
	$("#content_object_grade_co").multiselect({
		noneSelectedText: "Select Grades"
	});
	$("#content_object_grade_co").val(gradeValueCOVal.split("|")); 
	$("#content_object_grade_co").multiselect("refresh");
	
	$("#content_object_language").val(languageVal);
	
	$("#back").button({
		icons: {"primary": "ui-icon-back-arrow"},
		label: BACK_LABEL
	}).click(function() {
		window.location.href = GET_BACK_URL();
	});
	
	$("#continue").button({
		icons: {"primary": "ui-icon-save-object"},
		label: CONTINUE_LABEL
	}).click(function() {
		var value = $("#keywords").val();
		if(value.indexOf("|") == 0){
			value = value.substring(1, value.length);
		}
		$("#keywords").val(value);
		$(this).button('disable');
		$("#edit").button('disable');
		$("#editCheck").val("false");
		$("#dupStatus").val(opStatVal);
		var form = $(this).parents('form:first');
		form.submit();
	});
	$("#edit").button({
		icons: {"primary": "ui-icon-edit-object"},
		label: EDIT_SCO_LABEL
	}).click(function() {
		var value = $("#keywords").val();
		if(value.indexOf("|") == 0){
			value = value.substring(1, value.length);
		}
		$("#keywords").val(value);
		$(this).button('disable');
		$("#continue").button('disable');
		$("#editCheck").val("true");
		var form = $(this).parents('form:first');
		form.submit();
	});	
	
	$("#dupStatus").val(opStatVal);
	$("#content_object_course_title").val(courseTitle);
	$("#content_object_grade_low").val(gradeValueLow);
	$("#content_object_grade_high").val(gradeValueHigh);
	$("#content_object_learning_object").val(learningObjective);
	$("#content_object_resource_type").val(resourceType);
	$("#content_object_subject").val(subjectVal);
//	$("#content_object_language").val(languageVal);
//	$("#content_object_grade_pc").val(gradeValueCOVal); 
	$("#content_object_theme").val(theme);

	var keywordRow=$("<tr></tr>");
	var keywordCell=$("<td></td>");
	var keywordCell1=$("<td></td>");
	keywordsVar=$("#keywords").val().split('|');	
	addKeyword(keywordsVar);
	$("#content_object_keywords").keydown(function(event) {	
		if ( event.keyCode == 13 ) {
			event.preventDefault();		
			var index1=keywordsVar.indexOf($(this).val().trim());
			if( $(this).val().trim() !='' && index1==-1){
					var textEnteredValue 		= $(this).val().trim();
					textEnteredValue= textEnteredValue.replace(/^\s+|\s+$/g,"");
					textEnteredValue= textEnteredValue.replace(/\s{2,}/g, " ");
					if(textEnteredValue.indexOf("|") == 0){
						textEnteredValue = textEnteredValue.substring(1, textEnteredValue.length);
					}
					if(textEnteredValue.lastIndexOf("|") == textEnteredValue.length-1){
						textEnteredValue = textEnteredValue.substring(0, textEnteredValue.length-1);
					}
					if (textEnteredValue.length > 500){
						  var assetWait=$("<div><p>The entered text has more than 500 characters.</p></div"); 
		                  assetWait.dialog({
		                        modal: true,
		                        width: "auto", 
		                        height: "auto",
		                        position: ["center", "middle"],
		                        resizable: false,
		                        title: "Validation Error",
		                        buttons: [
		                                  {
		                                      text: "Ok",
		                                      click: function() {
		                                    	  assetWait.dialog("close");
		                                      }
		                                  }]
		                  });
		                  assetWait.dialog("widget").find(".ui-dialog-titlebar-close").first().css({display: "none"});
		                  assetWait.dialog("open");
					}
					else{
					var commaSeparatedValues 	= textEnteredValue.split("|");	
					for(var icounter=0; icounter<commaSeparatedValues.length;icounter++){
						var individualText = (commaSeparatedValues[icounter].replace(/^\s+|\s+$/g,""));
						var individualFinalText = individualText.replace(/\s{2,}/g, " ");
						if (individualFinalText.length >48){
							if (showPopup==true){
							}else {
							 var assetWait=$("<div><p>The entered keyword(s) has more than 48 characters. Please enter valid keyword(s).</p></div"); 
			                  assetWait.dialog({
			                        modal: true,
			                        width: "auto", 
			                        height: "auto",
			                        position: ["center", "middle"],
			                        resizable: false,
			                        title: "Validation Error",
			                        buttons: [
			                                  {
			                                      text: "Ok",
			                                      click: function() {
			                                    	  showPopup= false;
			                                    	  validKeyword = true;
			                                    	  assetWait.dialog("close");
			                                      }
			                                  }]
			                  });
			              
			                  assetWait.dialog("widget").find(".ui-dialog-titlebar-close").first().css({display: "none"});
			                  assetWait.dialog("open");
			                  validKeyword = false;
			                  if (showPopup ==false){
									showPopup= true;
								    
								}else{
									showPopup= false;
								}
							}
						}else{
							if(!($.inArray(individualFinalText, keywordsVar) > -1)){
								var specialChars = "<>,`&*;\"\=";
								var check = function(string){
									for(i = 0; i < specialChars.length;i++){
										if(string.indexOf(specialChars[i]) > -1){
											return true
										}
									}
								}
							if (check(individualFinalText)== true ){
								if (showPopup==true){
								}else {
										var assetWait=$("<div><p>The entered text has invalid special characters.</p></div"); 
											assetWait.dialog({
					                        modal: true,
					                        width: "auto", 
					                        height: "auto",
					                        position: ["center", "middle"],
					                        resizable: false,
					                        title: "Validation Error",
					                        buttons: [
					                                  {
				                                      text: "Ok",
				                                      click: function() {
				                                    	  showPopup= false;
				                                    	  assetWait.dialog("close");
				                                      }
				                                  }]
											});
											assetWait.dialog("widget").find(".ui-dialog-titlebar-close").first().css({display: "none"});
											assetWait.dialog("open");
											if (showPopup ==false){
												showPopup= true;
											}else{
												showPopup= false;
											}
									}								
							}else{
								var enteredText = textEnteredValue.length;
								
								var textLength = textEnteredValue.length;
								
								var existingkeywordslength =$("#keywords").val().length;
								finalLength = parseInt(existingkeywordslength)+parseInt(textLength);
								if(parseInt(existingkeywordslength) > 0 && $("#keywords").val().indexOf("|") == 0){
									finalLength = finalLength-1;
								}								
								if (finalLength > 4000){
									if (showPopup==true){
									}else {
									 var assetWait=$("<div><p>The total keywords attribute length exceeds more than 4000 characters. Please check.</p></div"); 
					                  assetWait.dialog({
					                        modal: true,
					                        width: "auto", 
					                        height: "auto",
					                        position: ["center", "middle"],
					                        resizable: false,
					                        title: "Validation Error",
					                        buttons: [
					                                  {
					                                      text: "Ok",
					                                      click: function() {
					                                    	  showPopup= false;
					                                    	  assetWait.dialog("close");
					                                      }
					                                  }]
					                  });
					              
					                  assetWait.dialog("widget").find(".ui-dialog-titlebar-close").first().css({display: "none"});
					                  assetWait.dialog("open");
					                  if (showPopup ==false){
											showPopup= true;
										}else{
											showPopup= false;
										}
									}
								}else{
									keywordsVar.push(individualFinalText);
								}
							}
							}
						}
					}
					
					if (validKeyword){
						addKeyword(keywordsVar);
					}
				}
			}
			$(this).val("");
		}
	});
	keywordCell1.append(upperDiv);
	keywordRow.append(keywordCell);
	keywordRow.append(keywordCell1);
	$("#tableForm").append(keywordRow);	
});

function addKeyword(keyword){	
	upperDiv.empty();

	for (var i = 0; i < keyword.length; i++) {
		var keywordStr = keyword[i].replace(/^\s+|\s+$/g,"");
		if (keywordStr.length >48){
			var keywordValue = keyword[i];
			keywordStr= (keywordValue.substring(0,48)).replace(/^\s+|\s+$/g,"");
		}		
		if(keywordStr.trim()!=''){
			var gap=$("<div></div>");
			var innerDiv= $("<div></div>");	
			var table=$("<table></table>");
			var tr=$("<tr></tr>");
			var keywordTd=$("<td></td>");
			innerDiv.attr({id:i});
			var removeTd = $("<td></td>");
			
			removeTd.addClass("keyword_removeTd");
			var removeid="remove"+i;
			removeTd.attr({id:removeid});
			removeTd.text("x");
			removeTd.click(function(){				
				var id = $(this).parent().first().attr("id");
				var index = parseInt(id);				
				keyword.splice(index,1);
				keywordsVar=keyword
				addKeyword(keyword);	
				$("#keywords").val(keywordsVar.join("|"));
				keywordValue= $("#keywords").val();
				keywordReplacementValue = keywordValue.replace('|','');
				$("#keywords").val(keywordReplacementValue);
			});
			keywordTd.text(keywordStr);
			keywordTd.addClass("keyword_keywordTd");			
			innerDiv.addClass("keyword_innerDiv");			
			innerDiv.append(keywordTd);	
			innerDiv.append(removeTd);			
			innerDiv.mouseenter(function(){
				var divid=$(this).attr('id');
			    $(this).css({background:"#2b2f88"});
			    $("#remove"+divid).show();
			    
			  });
			innerDiv.mouseleave(function(){
				var divid=$(this).attr('id');
			    $(this).css({background:"#7275b7"});
			    $("#remove"+divid).hide();
			  });
			gap.css({float:"left",paddingLeft:"2px",paddingRight:"2px"});
			
			gap.append("&nbsp;");
			upperDiv.append(gap);			
			upperDiv.append(innerDiv);
		}
	}
	$("#keywords").val(keywordsVar.join("|"));
	keywordValue= $("#keywords").val();
	keywordReplacementValue = keywordValue.replace('|','');
	$("#keywords").val(keywordReplacementValue);
}