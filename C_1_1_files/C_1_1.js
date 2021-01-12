(function($){

  function enableBlock(parent,enable){
    $(parent).find('.enabler-target').find(':input').prop('disabled',!enable);
  }

  $(function(){

    function collapse(n,parent) {
      $(parent)
        //.hide()
        .find(':input').prop('disabled',true);
    }

    function expand(parent) {
      $(parent)
        //.show(400)
        .find(':input').prop('disabled',false);
    }

    $('[name="SUPPLEMENTARY_NETWORK"]').change(function(){
      var selection = $(this).val();
      $('[data-enabled-by]').each(collapse);
      expand($('[data-enabled-by="'+selection+'"]').get(0));
    });


    ['PUBLIC_IPADDR','PUBLIC_IPNETMASK','CR_IPADDR','CR_NETMASK'].forEach(function(name){
      $('[name="'+name+'"]').prop('required',true);
    });

    $('[name="SUPPLEMENTARY_NETWORK"]:checked').change();

  });

})(jQuery);
