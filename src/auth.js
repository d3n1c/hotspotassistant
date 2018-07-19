import Router from './router'
import { Notify, SessionStorage, LocalStorage, Loading } from 'quasar'
import axios from 'axios'

const SERVER_HOST = 'https://randomuser.me/api/?nat=us';

function getPathTarget (pathkind = 'host') {
  var kindofpath = {
    host: SERVER_HOST,
  };

  var result = kindofpath[pathkind];
  let targetPath = LocalStorage.get.item(pathkind + '_spotassist_path');
  if (targetPath) {
    result = targetPath;
  }
  else {
    LocalStorage.set(pathkind + '_spotassist_path', result);
  }
  return result;
}

function authLogout() {
  SessionStorage.clear();
}

function getNIM() {
  let cookie = SessionStorage.get.item('mynim');
  if (!cookie) {
    return;
  }
  return cookie;
}

function getExistUser(nim = null) {
  let result = LocalStorage.get.item('spotassist_users');
  if (!result) {
    return;
  }
  return !nim ? result : (!result['spot-' + nim] ? null : result['spot-' + nim]);
}

export default {
  authNotify(nmessage, ntype = 'positive', nposition = 'top') {
    Notify.create({
      message: nmessage,
      type: ntype,
      position: nposition
    });
  },
  
  getMyNIM () {
    return getNIM();
  },
  
  getServerURL() {
    return getPathTarget();
  },
  
  checkAuth () {
    let cookie = getNIM();
    if (cookie) {
      return true;
    }
    authLogout();
    if (Router.currentRoute['name'] !== 'getnim') {
      this.authNotify(
        'Mohon masukkan NIM Anda terlebih dahulu',
        'negative'
      );
    }
  },

  setNIM (cred, redirect) {
    if (!cred) {
      this.authNotify(
        'No data available to be sent',
        'negative'
      );
      return;
    }
    
    let existing = getExistUser(cred);
    if (existing) {
      var mynim = {
        nim: cred,
        name: existing.name,
        user: existing.user
      };
      SessionStorage.set('mynim', mynim);
      if (redirect) {
        setTimeout(() => Router.push(redirect), 700);
      }
      return true;
    }
    
    Loading.show();
    var that = this;
    var targetPath = getPathTarget();
    axios.get(targetPath)
    .then((response) => {
      if (response.data) {
        let getdata = response.data.results[0];
        if (!getdata['name']) {
          return;
        }
//        console.log(getdata);
        var mynim = {
          nim: cred,
          name: getdata.name['first'] + ' ' + getdata.name['last']
        };

        SessionStorage.set('mynim', mynim);
        this.authNotify(
          'Hai ' + mynim.name + ', Apa kabar ?',
        );
        if (redirect) {
          setTimeout(() => Router.push(redirect), 700);
        }
        return true;
      }
      this.authNotify(
        'NIM Anda tidak dikenal',
        'negative'
      );
      if (redirect) {
        setTimeout(() => Router.push(redirect), 700);
      }
    })
    .catch((error) => {
      console.log(error);
      this.authNotify(
        error.response.data.message,
        'negative'
      );
    })
    .then(() => {
      Loading.hide();
    });
  },

  logout () {
    authLogout();
    this.authNotify(
      'Terima kasih, Silahkan mengisi NIM kembali',
    );
    Router.push({ name: 'getnim' });
  },
  
  checkValidNIM() {
    let token = getNIM();
    if (!token) {
      this.authNotify(
        'Anda perlu mengisi NIM kembali',
        'negative'
      );
      authLogout();
      return;
    }
    return true;
  }
}