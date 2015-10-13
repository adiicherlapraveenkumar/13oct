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
	
	$("#continue").button({
		icons: {"primary": "ui-icon-save-object"},
		label: CONTINUE_LABEL
	}).click(function() {
		$(this).button('disable');
		$("#edit").button('disable');
		$("#editCheck").val("false");
		var form = $(this).parents('form:first');
		form.submit();
	});	
	$("#edit").button({
		icons: {"primary": "ui-icon-edit-object"},
		label: EDIT_SCO_LABEL
	}).click(function() {
		$(this).button('disable');
		$("#continue").button('disable');
		$("#editCheck").val("true");
		var form = $(this).parents('form:first');
		form.submit();
	});
	
	$("#content_object_resource_type").val(resourceType);
	$("#content_object_subject").val(subjectVal);
	$("#content_object_language").val(languageVal);
	$("#content_object_theme").val(theme);
});
