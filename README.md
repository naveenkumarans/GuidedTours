## Practice

This practice comprises 1 exercise.

### Context

GuidedTours.com is a popular service in the United States of America. These tour operators conduct tours with tour guides to various popular tourist destinations in USA. Recently they have increased their presence across various cities by going online.

The app GuidedTours.com provides details of various day tours available with a personal guide. The customers can get the tour details and make request for their preferred tour by submitting their details online.

The tour guide can view all the requests submitted to take them forward for next course of action.

### Problem Statement

In the existing solution of GuidedTours.com app, implement route guards to ensure the following:
- Tour Requests should only be accessible to the registered tour guide
- App should seek confirmation from the visitor if he leaves the tour-request view without submitting the request

### Tasks

#### About the boilerplate

- The boilerplate code contains route-enabled solution for `GuidedTours.com` app.
    - The components in the app are styled using Angular Material components and themes.
- The boilerplate code also contains folder `images` which contains image files required by this app.

#### Task # 1 – Add `auth` Service

1. Run the following command to add `auth` service to the app

    `ng generate service services/auth` or `ng g s services/auth`
2. In `AuthService` class add boolean property `isLogged` and initialize it with value `false`.
3. In `AuthService` class add method `login()` method.
    - the method should accept string parameter `tourGuideCode`.
    - the method should compare the value of parameter with the value `TG@2022` and assign the result of comparision to `isLoggedIn` variable.
    - the method should then return the value of `isLoggedIn` property.
    
4. In `AuthService` class add method `logout()` method that assigns value `false` to `isLoggedIn` property.
    ```ts
        isLoggedIn: boolean = false;
        login(tourGuideCode: string) {
            this.isLoggedIn = tourGuideCode === "TG@2022"
            return this.isLoggedIn;
        }
        logout() {
            this.isLoggedIn = false;
        }
    ```
#### Task # 2 - Add `Login` Component

1. In `AppRoutingModule`, to the `Routes` array, add route definition for routing to `LoginComponent`
        ```ts
            { path: "login", component: LoginComponent }
        ```
    2. In the `RouteService` add method `navigateToLoginView()` that allows navigation to `login` view.
        ```ts
            navigateToLoginView() {
                this.router.navigate(["login"]);
            }
        ```
    3. Add `AuthService` and `RouteService` to the `Login` component
    4. Define string property `tourGuideCode` in the `Login` component and initialize it with empty string.
    5. Add `validateTourGuideCode()` method to validate the inputted `tourGuideCode` value.
        - pass the `tourGuideCode` value to the `login()` method of `authService`
        - if the `login()` method returns true call the `navigateToTourRequestsView()` method of `RouteService`
        ```ts
            validateTourGuideCode() {
                if(this.authService.login("TG@2022"))
                {
                this.routeService.navigateToTourRequestsView();
                }      
            }
        ```
    6. In the template of `Login` component 
        - add an input field to accept tour-guide code and a button which calls the `validateTourGuideCode()` method when clicked. (User Angular Material components for designing `login` view)
        - add link to allow visitors to route to `home` view and view the available tours.
        ```html
            <mat-toolbar id="header" color="primary">
                <h1>Guided-Tours.com</h1>
            </mat-toolbar>
            <div id="login-form">
                <h3>If you are Tour Guide enter your Tour Guide Code</h3>
                <mat-form-field appearance="legacy">
                    <mat-label>Enter Tour Guide Code</mat-label>
                    <input matInput name="tourGuideCode" 
                    [(ngModel)]="tourGuideCode"
                    placeholder="Tour Guide Code">
                </mat-form-field>
                <button mat-button color="primary" (click)="validateTourGuideCode()">Submit</button>
                <h3><a routerLink="">Click here if you are a Visitor</a></h3>
            </div>
        ```
    7. Add the following style code for `Login` component
        ```css
            #login-form {
                max-width: 400px;
                margin: auto;
                margin-top: 100px;
            }
        ```
#### Task # 3 - Create `CanActivate` Route Guard

1. Run the following command to create `CanActivate` guard
    `ng generate guard services/auth` or `ng g g services/auth`
2. In `AuthGuard` class implement `canActivate()` method of `CanActivate` guard interface.
3. Inject `AuthService` and `RouteService` to the `AuthGuard`
4. The `canActivate()` method should check the value of `isLoggedIn` property of `AuthService`
    - if the value of `isLoggedIn` property is true, `canActivate()` method should return true.
    - if the value of `isLoggedIn` property is false,
    `canActivate()` method should call `navigateToLoginView()` method of `RouteService` and return `false`.
    ```ts
        canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if(!this.authService.isLoggedIn){
                this.routeService.navigateToLoginView();
                return false;
            }
            else
                return true;
        }
    ```
#### Task # 4 - Add `CanActivate` Route Guard

1. Add `CanActivate` route guard to route with path `tour-requests` in the `app-routing.module.ts` file
```ts
    const routes: Routes = [
        { path: "login", component: LoginComponent },
        { path: "", component: HomeComponent },
        { path: "tour-cart/:id", component: TourCartComponent },
        { path: "tour-requests", component: TourRequestsComponent, canActivate: [AuthGuard] },
        { path: "**", component: NotFoundComponent }
    ];
```
2. To test the `CanActivate` guard, perform following steps:
    - run the application, `home` view should get launched.
    - in the address bar of browser type the URL `http://localhost:4200/tour-requests`
        - the app should navigate to `login` view
        - input the `tourGuideCode` and click on submit
        - for the valid code, the app will navigate user to `TourRequests` view
#### Task # 5 - Create `CanDeactivate` Route Guard
1. Run the following command to create `CanDeactivate` guard
    `ng generate guard can-deactivate` or `ng g g can-deactivate`
2. In the `CanDeativate` route guard class:
    - replace `CanDeactivateComponent` with `TourCartComponent`
    - the type of `component` parameter in `canDeactivate()` method should be changed to `TourCartComponent`
3. The `canDeactivate()` method of this guard should check whether the `component` contains definition of `canDeactivate` method
    - if true, the `canDeactivate()` method of `TourCartComponent` must be called and its value must be returned.
    - if false, value `true` must be returned.
    ```ts
        canDeactivate(
            component: TourCartComponent,
            currentRoute: ActivatedRouteSnapshot,
            currentState: RouterStateSnapshot,
            nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            return component.canDeactivate ? component.canDeactivate() : true;
        }
    ```
4. Add `CanDeactivateGuard` to path for `TourCart` component in route configuration
    ```ts
    { path: "tour-cart/:id", component: TourCartComponent, canDeactivate:[CanDeactivateGuard] }
    ```
5. Refactor `TourCart` component to implement confirmation workflow for unsubmitted requests
    1. Add boolean property `submitStatus` initialized with value `false`.
    2. Define `canDeactivate()` method that checks for value of `submitStatus` property
        - if the value is not true, it should call the JavaScript function `confirm()` to take confirmation from the user for leaving the view with unsaved changes.
        - if the value is true, value `true` must be returned.
        ```ts
              canDeactivate() {
                if (!this.submitStatus)
                    this.submitStatus = confirm("You have not made a request to this tour, Are you sure you want to leave?");
                return this.submitStatus;
            }
        ```
    3. Set the `submitStatus` property to `false` when the component initializes and fetches the tour details for the `id` read from the route
        ```ts
            ngOnInit(): void {
                this.activatedRoute.paramMap.subscribe(param => {
                    let id = param.get("id") ?? "";
                    this.tourService.getTour(id).subscribe(data => {
                        this.tour = data;
                        this.stars = new Array(this.tour.rating);
                        this.submitStatus = false;
                    })
                })
            }
        ```
    4. Set the `submitStatus` property to `true` in the `makeRequest()` method after the changes have been saved to the server
        ```ts
            makeRequest() {
                if (this.tourRequest.customerName && this.tourRequest.customerEmail && this.tourRequest.customerPhone && this.tourRequest.dateOfTravel) {
                this.tourRequestService.saveTourRequest(this.tourRequest).subscribe(data => {
                    this.snackBar.open("Request Submitted", "", {
                    duration: 3000
                    });
                    this.submitStatus = true;
                    this.routeService.navigateToHomeView();
                })
                }
            }
        ```
    5. Test the working of `CanDeactivate` guard by performing following steps:
        - run the app
        - click on `cart` icon of any tour listed on the `home` view
        - the app navigates to `TourCart` component
        - click on `home` icon on the toolbar of the page
        - the app should show a confirmation box, seeking confirmation from user to leave the view without submitting the request
            - if user confirms, app navigates to `home` view
            - else, the user stays on the `TourCart` view
        - go to `home` view and again click on `cart` icon of any tour listed on the `home` view
        - fill up and submit the details for the displayed tour on `TourCart` view
        - click on `Make Request` button, user should be navigated to `home` view and a notification gets displayed with the message `Request Submitted`