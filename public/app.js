(function() {
    'use strict';
    angular.module('productApp', [])
        .service('ProductService', ['$http', function($http) {
            var apiUrl = '/api/products';
            this.getProducts = function() {
                return $http.get(apiUrl);
            };
            this.addProduct = function(product) {
                return $http.post(apiUrl, product);
            };
            this.deleteProduct = function(id) {
                return $http.delete(apiUrl + '/' + id);
            };
        }])
        .controller('ProductController', ['ProductService', '$scope', '$timeout', function(ProductService, $scope, $timeout) {
            var vm = this;
            vm.products = [];
            vm.filteredProducts = [];
            vm.newProduct = {};
            vm.loading = false;
            vm.successMessage = '';
            vm.errorMessage = '';
            vm.searchText = '';
            vm.sortBy = 'created_at';
            vm.sortReverse = true;
            vm.productToDelete = null;
            vm.messageTimeout = null;

            vm.loadProducts = function() {
                vm.loading = true;
                ProductService.getProducts().then(function(response) {
                    vm.products = response.data.data || [];
                    vm.applyFilters();
                }, function() {
                    vm.showErrorMessage('Failed to load products.');
                }).finally(function() {
                    vm.loading = false;
                });
            };

            vm.addProduct = function() {
                vm.clearMessages();
                vm.loading = true;
                ProductService.addProduct(vm.newProduct).then(function(response) {
                    vm.showSuccessMessage(response.data.message);
                    vm.newProduct = {};
                    vm.loadProducts();
                }, function(error) {
                    if (error.data && error.data.errors) {
                        var errors = error.data.errors;
                        vm.showErrorMessage(Object.values(errors).join(' '));
                    } else {
                        vm.showErrorMessage('Failed to add product.');
                    }
                }).finally(function() {
                    vm.loading = false;
                });
            };

            vm.confirmDelete = function(product) {
                vm.productToDelete = product;
                $('#deleteModal').modal('show');
            };

                        vm.deleteProduct = function() {
                if (!vm.productToDelete) return;

                vm.clearMessages();
                vm.loading = true;

                ProductService.deleteProduct(vm.productToDelete.id).then(function(response) {
                    vm.showSuccessMessage(response.data.message);
                    vm.loadProducts();
                    $('#deleteModal').modal('hide');
                    vm.productToDelete = null;
                }, function() {
                    vm.showErrorMessage('Failed to delete product.');
                }).finally(function() {
                    vm.loading = false;
                });
            };

            // Bonus Features: Sorting and Filtering
            vm.sortByField = function(field) {
                if (vm.sortBy === field) {
                    vm.sortReverse = !vm.sortReverse;
                } else {
                    vm.sortBy = field;
                    vm.sortReverse = false;
                }
                vm.applyFilters();
            };

            vm.getSortIcon = function(field) {
                if (vm.sortBy !== field) {
                    return 'glyphicon-sort';
                }
                return vm.sortReverse ? 'glyphicon-sort-by-attributes-alt' : 'glyphicon-sort-by-attributes';
            };

            vm.applyFilters = function() {
                var filtered = vm.products;

                // Apply search filter
                if (vm.searchText) {
                    filtered = filtered.filter(function(product) {
                        return product.name.toLowerCase().indexOf(vm.searchText.toLowerCase()) !== -1;
                    });
                }

                // Apply sorting
                filtered.sort(function(a, b) {
                    var aVal = a[vm.sortBy];
                    var bVal = b[vm.sortBy];

                    // Handle date fields for created_at
                    if (vm.sortBy === 'created_at') {
                        aVal = new Date(aVal);
                        bVal = new Date(bVal);
                    } else if (typeof aVal === 'string') {
                        aVal = aVal.toLowerCase();
                        bVal = bVal.toLowerCase();
                    }

                    if (aVal < bVal) return vm.sortReverse ? 1 : -1;
                    if (aVal > bVal) return vm.sortReverse ? -1 : 1;
                    return 0;
                });

                vm.filteredProducts = filtered;
            };

            // Message handling functions
            vm.clearMessages = function() {
                vm.successMessage = '';
                vm.errorMessage = '';
                if (vm.messageTimeout) {
                    $timeout.cancel(vm.messageTimeout);
                    vm.messageTimeout = null;
                }
            };

            vm.showSuccessMessage = function(message) {
                vm.clearMessages();
                vm.successMessage = message;
                vm.messageTimeout = $timeout(function() {
                    vm.successMessage = '';
                }, 3000);
            };

            vm.showErrorMessage = function(message) {
                vm.clearMessages();
                vm.errorMessage = message;
                vm.messageTimeout = $timeout(function() {
                    vm.errorMessage = '';
                }, 3000);
            };

            // Watch for search text changes
            $scope.$watch('pc.searchText', function() {
                vm.applyFilters();
            });

            // Initial load
            vm.loadProducts();
        }]);
})();
