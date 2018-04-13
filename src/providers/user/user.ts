import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {


    let url = "Login?username="+accountInfo["username"]+"&password="+accountInfo["password"];
    console.log(url);
    let seq = this.api.post(url, accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('SignUp', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  getClasses(Info: any) {


    let url = "getClasses?batchTypeId="+Info["batchTypeId"];
    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getSubjects(Info: any) {


    let url = "getSubjects?classId="+Info["classId"];
    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getTeachers(Info: any) {


    let url = "getTeachers?classId="+Info["classId"]+"&subjectId="+Info["subjectId"];
    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getCategories(Info: any) {


    let url = "getCategories";
    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getTests(Info: any) {


    let url = "GetTestList?classId="+Info["classId"]+"&subjectId="+Info["subjectId"]+"&teacherId="+Info["teacherId"]+"&categoryId="+Info["categoryId"];
    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getATest(Info: any) {


    let url = "GetTest/9?and="+Info["testId"];

    console.log(url);
    let seq = this.api.get(url).share()
    // let seq = this.api.post(url, Info).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
