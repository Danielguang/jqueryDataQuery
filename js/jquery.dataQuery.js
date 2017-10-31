(function($){
  $.fn.dataQuery = function(options){
      var settings = $.extend({
        plusIcon: "+",
        minusIcon:"-"
      },options);
      

      // setp 1 generate templates
      generateTemplate(this)
      addRules(this);
      addGroupRules(this);
      deleteCurrentNode(this);

      function generateTemplate($container){
        var addIcons = "<div class='dataQuery-addRules dataQuery-icons left'>"+settings.plusIcon+"</div>";
        
        
        var conditionsdropDown = generateDropDown(settings.conditions,"conditions-filter");
        var templateStr = "<div class ='clearfix dataQueryBuilder'>" + addIcons + conditionsdropDown + "<div class='left rules-container'></div></div>";
        console.log(templateStr);
        //console.log("container",container);
        
        
        if($container.html()){
          $container.after(templateStr);
          $fieldsRender = $container.next(".dataQueryBuilder").find(".rules-container");
          $fieldsRender.append($container)
        
        }else{
          $container.append(templateStr);
          $fieldsRender = $container.find(".rules-container");
        }
        $(".conditions-filter select").selectpicker(); 
        
        renderFilter($fieldsRender);
       
      }

      function renderFilter($container){
        var addGroupRulesContainer = "<div class='dataQuery-addGroupRules dataQuery-icons left'>"+settings.plusIcon+"</div>";
        var deleteRules = "<div class='dataQuery-deleteRules dataQuery-icons left'>"+settings.minusIcon+"</div>";
        var operatorContainer ="<div class='dataQuery-operator left'></div>";
        var valueDropDownContainer = "<div class= 'left dropDown-value-container'></div>"
        var fieldsDropDownArray =[];
        $.each(settings.valueOptions,function(index,element){
            fieldsDropDownArray.push(element.name);
        })
         var fieldsDropDown = generateDropDown(fieldsDropDownArray,"fields-filter");
         var appendStr = "<div class='clearfix row'>"+fieldsDropDown + operatorContainer + valueDropDownContainer + addGroupRulesContainer +deleteRules+"</div>"
         //$(".rules-container").append(appendStr);
         $container.append(appendStr);
         console.log("asdasdas",fieldsDropDownArray);
         var fieldsOptionSettings = settings.filterOptions
        $(".fields-filter select").selectpicker(settings.filterOptions);
         renderFilterDetail();
        //addRules();

       
      }


      function generateDropDown(inputArray,className,multiple){
        var dropDown = "";
          $.each(inputArray,function(i,v){
            dropDown +="<option value = '"+v+"'>"+v+"</option>"
          });
          var search ="";
          var multipleText = "";
          if(multiple){
               multipleText = "multiple"
          }
          var dropDownStr = "<div class='"+className+" left'><select class= 'selectbox' "+ multipleText + ">"+dropDown+"</select></div>";
          return dropDownStr
      }

  

      //$(".selectbox").selectpicker();
      
     
      //$(".conditions-filter select").selectpicker("refresh")


      function renderFilterDetail(){
          $(".fields-filter select").on("changed.bs.select",function(){
                    var $operationContainer = $(this).parents(".fields-filter").siblings(".dataQuery-operator");
                    var selectedValue = $(this).val();
                    
                    var filterArray = $.grep(settings.valueOptions,function(n,i){
                      return n.name==selectedValue;
                    })
                    var appendStr ="";
                    //start generator operator
                    var selectOptions = filterArray[0];
                    var emptyOperate;
                    if(selectOptions.emptyFilter){
                      emptyOperate = selectOptions.operator.concat(selectOptions.emptyFilter);
                    }
                    var appendOpertorStr = generateDropDown(emptyOperate,"operator-drop-down");
                    $(this).parents(".fields-filter").siblings(".dataQuery-operator").html(appendOpertorStr);
                    $(".dataQuery-operator select").selectpicker();
                  //end generator operator

                  //start generate values options
                  //this is to generator a dropdown
                
                  if(selectOptions.value){
                    var valuesAppendStr = generateDropDown(selectOptions.value,"value-dropdown",true);
                      $(this).parents(".fields-filter").siblings(".dropDown-value-container").html(valuesAppendStr);
                  
                      $(".dropDown-value-container select").selectpicker(selectOptions.option);
                  }else{
                    //else will display input text
                      $(this).parents(".fields-filter").siblings(".dropDown-value-container").html("<input type ='text' class= 'form-control' />")
                  }
                    $(".dataQuery-operator select").on("changed.bs.select",function(){
                      var operatorValue = $(this).val();
                      if($.inArray(operatorValue,selectOptions.emptyFilter)>=0){
                        $(".dropDown-value-container").addClass("hide");
                        $(".dropDown-value-container select").selectpicker("val","");
                          $(".dropDown-value-container input").val("");
                      }else{
                        $(".dropDown-value-container").removeClass("hide");
                      }

                    })

          });
      }
     

    
     function deleteCurrentNode($container){
       $container.on("click",".dataQuery-deleteRules",function(){
         //two cases here to be handle
         // has more than two child, directly delted
         var childrenLength = $(this).closest(".row").siblings(".row").length ;
         //console.log($(this).closest(".rule-container").find(".row").length)
         
         console.log("childrenLength",childrenLength);
         console.log("childrenLength",$(".dataQueryBuilder").length);
         if(childrenLength ==0 && $(".dataQueryBuilder").length > 1){
          $(this).closest(".dataQueryBuilder").remove();
         }
          $(this).parent(".row").remove(); 
          
        })

     }
      
      function addRules($container){
        $container.on("click",".dataQuery-addRules",function(){
          renderFilter($(this).siblings(".rules-container"));
        })
      }

      function addGroupRules($container){
         $container.on("click",".dataQuery-addGroupRules",function(){
            $template_container = $(this).parent(".row");
           generateTemplate($template_container);
        })
      
      }







      return;
  };
}(jQuery))
