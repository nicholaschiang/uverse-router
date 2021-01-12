$(function(){

  var form$ = $('#access-code-form');

  form$.find('[name="USE_DEFAULT"]:radio')
    .change(function(){
      var useDefault = $('#USE_DEFAULT_TRUE').is(':checked');
      $('#select-access-code-set')
        .toggleClass('disabled-block',useDefault)
        .find(':input').prop('disabled',useDefault);
      if (!useDefault) $('[name="PASSWORD"]').get(0).focus();
    })
    .change();

  $.validator.addMethod(
    "contains2charClasses",
    function(value,element){
      var classCount =
        (value.match(/[A-Za-z]/) == null ? 0 : 1) +
        (value.match(/[0-9]/) == null ? 0 : 1) +
        (value.match(/[@#%\*=\?\/\\&<>]/) == null ? 0 : 1);
      return this.optional(element) || classCount > 1;
    },
    "Value does not conform to password format rules."
  );

  form$.validate({
    rules: {
      PASSWORD: {
        minlength: 8,
        maxlength: 14,
        contains2charClasses: true
      }
    }
  });

  $('[name="OLDPASSWORD"]').get(0).focus();

});
