# jqueryDataQuery

This is the plugin in based on combine with bootsrap select box
https://silviomoreto.github.io/bootstrap-select/examples/

# Feature
Allow useds to auto generator the query
Allow users to do alive search and mutiply selected in dropdown

# install
You need to install jquery and boostrap select

and import jquery.dataQuery.js

# API 

"conditions":["and","or"],</BR>
"plusIcon":"<i class='fa fa-plus' aria-hidden='true'></i>",</BR>
"minusIcon":"<i class='fa fa-minus' aria-hidden='true'></i>",</BR>
"filterOptions":{</BR>
   "title":"--please select fields--",</BR>
   "liveSearch":true  </BR>  
  },  </BR>
  "valueOptions":[</BR>
        {</BR>
          "name":"Data of Birth",</BR>
          "value":["1990-12-01","1992-12-02"],</BR>
          "option":{</BR>
            "title":"--please select values--",</BR>
            "liveSearch":true,</BR>
          },</BR>
          "emptyFilter":["is not empty","is empty"],</BR>
          "operator":["equals","like","contains"]</BR>
        },</BR>
        {</BR>
          "name":"Work Experence",</BR>
          "textBox":true,</BR>
          "emptyFilter":["is not empty","is not null"],</BR>
          "operator":["equals","contains"]</BR>
        }</BR>
    ]</BR>



# TDOD
Add json generator and sql convert
