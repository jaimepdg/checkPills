// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBMRdvAH-VHwkEz3DZXma-2mN7bIVUtStI",
    authDomain: "checkpill.firebaseapp.com",
    projectId: "checkpill",
    storageBucket: "checkpill.appspot.com",
    messagingSenderId: "398704312133",
    appId: "1:398704312133:web:cb33f6179c56cb0770482c"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

app.controller('calendarController', function($scope) {

    this.$onInit = function(){
        $scope.getCheckedDays();
    };


    $scope.daysOfMonth = []; // Aquí se almacenarán los días del mes

    // Genera los días del mes
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                      $scope.currentMonthName = monthNames[month];
    var daysInMonth = new Date(year,month +1, 0).getDate();
    for (var i = 1; i <= daysInMonth; i++) {
        $scope.daysOfMonth.push({Date: i, checked: false});
    }

    $scope.registerPillTaken = function() {
        var today = new Date().getDate();
        $scope.daysOfMonth[today - 1].checked = true;

        // Guarda los datos en Firebase
        var db = firebase.firestore();
        db.collection("daysOfMonth").doc(String(today)).set({
            checked: true
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    };
    $scope.getCheckedDays = function(){
        var db = firebase.firestore();
        db.collection("daysOfMonth").get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) =>
            {
                var day = doc.id;
                var data = doc.data();
                if ($scope.daysOfMonth[day - 1]) {
                    $scope.daysOfMonth[day -1].checked = data.checked;
                    console.log("Datos recibidos");
                }
            });
            $scope.$apply();
        });
    };
    $scope.Bienvenida = function(){
        alert("¡Bienvenide a CheckPills!")
    }
    $scope.nombre = "jaime"
});