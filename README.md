# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

// Next steps - 263

<!-- Create middleware that attaches user details to the req.body that we can access acroos the entire app
DONE
 -->

 <!-- Protected routes on the backend, protected middleware DONE-->

 <!-- finish the userController backend DONE -->

<!--
    - Make the login to persist (refresh token else redirect to /landing)
 -->

<!-- Frontend router protected routes, if not logged in can only access register,login and landing -->

<!-- FInish landing page
    - Image with buses
    - Hero explaining whats the application about
    - Login/register button
 -->

 <!--  Verify token action (which gets invoked on the /user/very-email route - verify page) that goes to /verify-email and passes as data the token 
 and email that we can fromk the url using the query 
 
verifyToken - arguments that im expecting to get from the page it self, params


use an useEffect to invoke the verify tokenb action when the page loads.
if it is loading return a h2 loading or spinner
 If there is an error, return an h4 with a message
 everythjing is okay, return and h2 with account confirmed and LInk to the sign in page 
 -->

<!-- FInish Verify page, navigate away after verifying the link and display error if trying to reload the page after token was already verified -->

<!-- Once i go to the verify page, show account verifeid and button to log in -->

<!-- Landing page:
    - Bus logo
    - introduction of the website and what it was made for
    - what you can acomnplish with the page
    logo up left
    2 sections taking up to 60% of the page - left side the introduction,etc - right side big picture
    middle bottom section with the login/register button
-->

<!-- Git source control - axios, j query  - middleware
        - Helmet docs, cors, mongoSanitize, xss, ratelimiter
        - _redirect file for netifly
--


<!-- NEWS : only admins can create/post news
    - newsFedd will have a create news button which wil redirec to /createNews
    - in create news there will be a Form waiting for all the inputs to be filled:
       - Title , description , image/pdf ,
    Model will wait for the input + createdAt(timestamps), createdBy, will be tided to the user that created it.


    News will display on the feedPage as a card with just a title - short description and who created it- once they click the card will be redirected to that singleNewsPage which will contain a wider description with images/pdf/'S previews.

    I should first invoke the uploadImage endpoint in the form - upload image button, which will give me as a result the src of the image and thats what i pass on the create news along the other details.
 - -->

 <!-- Issues: only admins can create/post or update issues
    - similar to newsfeed, there will be a create issues button which will take you to the createIssues page:
    it will contain: Title, descreption, location, status,picture will be tied to the user.
    integrare google maps / location optional . 
  -->

  <!-- User: - Will have the RegisterInvite componenet: which will take an input : email and will send the invitation that will trigger the action.
   
      - Create a Model call, InviteTokens: which wil0l contain the token that we ll use to verify the user torught the url.

      Steps : 1. /register-invite on back end.  
   -->
