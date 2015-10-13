var upperDiv=$("<div></div>");
var keywordsVar=[];
$(window).load(function() {
	$("#content_object_grade_pc").multiselect();
	$("#content_object_grade_pc").multiselect({
		noneSelectedText: "Select Grades"
	});
	$("#content_object_grade_pc").val(gradeValuePCVal.split("|")); 
	$("#content_object_grade_pc").multiselect("refresh");
	
	$("#back").button({
		icons: {"primary": "ui-icon-back-arrow"},
		label: BACK_LABEL
	}).click(function() {
		window.location.href = GET_BACK_URL();
	});
	
	$("#save").button({
		icons: {"primary": "ui-icon-save-object"},
		label: SAVE_LABEL
	}).click(function() {
		$(this).button('disable');
		$("#edit").button('disable');
		$("#editCheck").val("false");
		var form = $(this).parents('form:first');
		form.submit();
	});
	$("#content_object_course_title").val(courseTitle);
	$("#content_object_grade_low").val(gradeValueLow);
	$("#content_object_grade_high").val(gradeValueHigh);
	$("#content_object_learning_object").val(learningObjective);
	$("#content_object_resource_type").val(resourceType);
	$("#content_object_subject").val(subjectVal);
	$("#content_object_language").val(languageVal);
	$("#content_object_theme").val(theme);
	
	$("#edit").button({
		icons: {"primary": "ui-icon-edit-object"},
		label: EDIT_SCO_LABEL
	}).click(function() {
		$(this).button('disable');
		$("#save").button('disable');
		$("#editCheck").val("true");
		var form = $(this).parents('form:first');
		form.submit();
	});	
	
	var shortBannerTitle="";
	var bannerTitle="";
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
		
		$("#bannerTitle").html("&nbsp;Edit Master SCO for "+shortBannerTitle+".......");
		$("#bannerTitle").mouseover(function(){			
			$("#bannerTitle").attr('title', bannerTitle);
		})
	}else{
		$("#bannerTitle").html("&nbsp;Edit Master SCO for "+title+"....");
	}
});