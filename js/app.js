angular.module('snietApp', ['ngRoute','ngStorage']);


angular.module('snietApp').run(function ($rootScope, $location, tokenService, $localStorage,
 userService) {
	
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
		
		console.log("Pagina requisitada: " + next.templateUrl);
		console.log("Necessita estar logado: " + (next.authorize?'sim':'não'));
		console.log("Nivel de acesso exigido: " + next.level);
		if(userService.getUserLoged())
			console.log("Seu nivel de acesso: " + userService.getUserLoged().acessLevel);
		else
			console.log("Você não está logado!");

		if (next.authorize) {
			
			var user = userService.getUserLoged();
			
			if(!tokenService.getToken()){
				console.log("Você não tem um token válido. Bye!!!");
				userService.removeUserLoged();
			}
			else 	
				console.log("Seu token: " + tokenService.getToken().substring(0,9));

			if (!user||!tokenService.getToken()||next.level<user.acessLevel) {
				$rootScope.$evalAsync(function () {
					$location.path('/unauthorized');
				})
			}
		}
		console.log("--------------------------------------");
	});
});
