'use strict';



angular.module('firebaseauths').factory('FirebaseSchema', FirebaseSchema);
angular.module('firebaseauths').factory('FirebaseDoubleConn', FirebaseDoubleConn);

function FirebaseSchema($window, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URI, Authentication) {
	var userInfo;
	var myConnectionsRef;
	var lastOnlineRef;
	var connectedRef;
	var localConnection = false;
	var syncPresences;
	return {
		runCheckPresenceStatus: function() {
			userInfo = Authentication.user;
			myConnectionsRef = new Firebase(FIREBASE_URI+'users/'+userInfo._id+'/connections');
			lastOnlineRef = new Firebase(FIREBASE_URI+'presence/users/'+userInfo._id+'/lastOnline');
			connectedRef = new Firebase(FIREBASE_URI+'.info/connected');

			syncPresences = $firebaseArray(myConnectionsRef);
			connectedRef.on('value', function(snapshot) {
				localConnection = true;
				if (snapshot.val() === true) {
					var con = myConnectionsRef.push(true)
					con.onDisconnect().remove();
					lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP)
				}
			});
			myConnectionsRef.on('child_added', function(childSnapshot, prevChildKey) {
				console.log('changed: ');
				console.log(childSnapshot.val());
				console.log(prevChildKey);

				if(prevChildKey){
					console.log('logOut');
					alert('more than two connections');
					$window.location.href = 'auth/signout';
				}
			})

			return syncPresences;
		},
		removeLogin: function() {
			myConnectionsRef.remove();
			lastOnlineRef.set(Firebase.ServerValue.TIMESTAMP);
			localConnection = false;
		},
		getConnection: function() {
			return localConnection;
		},
		getNumConnection: function(){
			if(syncPresences)
				return syncPresences.length;
			else
				return 0;
		}
	};
}


function FirebaseDoubleConn($firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URI, Authentication) {

}