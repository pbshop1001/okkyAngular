'use strict';



angular.module('firebaseauths').factory('FirebaseSchema', FirebaseSchema);

function FirebaseSchema($firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URI, Authentication) {

	var userInfo = Authentication.user;
	console.log(userInfo);

	var myConnectionsRef = new Firebase(FIREBASE_URI+'users/'+userInfo._id+'/connections');
	var lastOnlineRef = new Firebase(FIREBASE_URI+'presence/users/'+userInfo._id+'/lastOnline');
	var connectedRef = new Firebase(FIREBASE_URI+'.info/connected');






	return {
		runCheckPresenceStatus: function() {
			var syncPresences = $firebaseArray(myConnectionsRef);
			connectedRef.on('value', function(snapshot) {
				if (snapshot.val() === true) {
					var con = myConnectionsRef.push(true)
					con.onDisconnect().remove();
					lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP)
				}
			});

			return syncPresences;
		},
		removeLogin: function() {
			console.log('dd');
			//var myConnectionsRef = new Firebase(FIREBASE_URI+'users/'+userInfo._id+'/connections');
			myConnectionsRef.remove();
			//var con = myConnectionsRef.push(true);
			//con.remove();
			lastOnlineRef.set(Firebase.ServerValue.TIMESTAMP);
		}
	};
}
