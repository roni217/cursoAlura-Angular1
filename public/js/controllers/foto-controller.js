angular.module('alurapic')
.controller('FotoController', function($scope, $http, $routeParams) {

	$scope.foto = {};
	$scope.mensagem = '';

	if($routeParams.fotoId) {
		$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto){
			$scope.foto = foto;
		})
		.error(function(erro){
			console.log(erro);
			$scope.mensagem = "Não foi possível obter a tofo";

		})
	}

	$scope.submeter = function() {
		if ($scope.formulario.$valid) {
			if($scope.foto._id){
				$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
				.success(function(){
					$scope.mensagem = 'A foto'+ $scope.foto.titulo +' foi possível alterar a foto';
				})
				.error(function(erro){
					$scope.mensagem = 'Não foi possível alterar a foto';
					console.log(erro);
				})
			} else {
				$http.post('/v1/fotos', $scope.foto)
				.success(function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto adicionada com sucesso';
					console.log('Foto adicionada com sucesso');
				})
				.error(function(erro) {
					$scope.mensagem = 'Não foi possível cadastra a foto';
					console.log(erro);
				});
			}
		}
	};

});