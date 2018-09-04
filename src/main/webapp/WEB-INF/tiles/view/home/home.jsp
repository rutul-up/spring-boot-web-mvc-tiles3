<div>
	Main content would go here. Lets try. <a href="/logout">Logout</a>
</div>


<!-- CSS Files -->
<link rel="icon" type="image/png" href="/app-resources/images/favicon.ico" />
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css" />
<link rel="stylesheet" href="/app-resources/css/riliwan-rabo.css" />
<link rel="stylesheet" href="/app-resources/css/style.css" />

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->


<div ng-app="wizardApp" ng-cloak>


<div class="container">
    <div ui-view></div>
</div>

<script type="application/javascript">
    var getPathname = function () {
        var link = document.createElement("a");
        link.href = location.href;
        return link.pathname;
    };

    const $CONTEXT_PATH$ = getPathname();
</script>



<!-- Vendor js libraries -->
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.min.js"></script>

<!-- Bootstrapping -->
<script src="/app-resources/js/app.module.js"></script>

<!-- Wizard - Form feature -->
<script src="/app-resources/js/form/form.component.js"></script>
<script src="/app-resources/js/form/form.controller.js"></script>
<script src="/app-resources/js/form/formData.value.js"></script>

<!-- Wizard - Personal feature -->
<script src="/app-resources/js/personal/personal.component.js"></script>
<script src="/app-resources/js/personal/personal.controller.js"></script>

<!-- Wizard - Work feature -->
<script src="/app-resources/js/work/work.component.js"></script>
<script src="/app-resources/js/work/work.controller.js"></script>

<!-- Wizard - Address feature -->
<script src="/app-resources/js/address/address.component.js"></script>
<script src="/app-resources/js/address/address.controller.js"></script>

<!-- Wizard - Result feature -->
<script src="/app-resources/js/result/result.component.js"></script>
<script src="/app-resources/js/result/result.controller.js"></script>



</div>