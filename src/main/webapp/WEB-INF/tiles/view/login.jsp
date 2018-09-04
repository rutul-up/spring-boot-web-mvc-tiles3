<h1>Login</h1>

<form action="login" method="POST" class="form-signin">
    <h3 class="form-signin-heading" th:text="Login"></h3>
    <br/>
    <div class="form-group">
        <label for="email">Username</label>
        <input type="text" id="email" name="username"
               class="form-control" value="admin@admin.com"/>
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input type="password"
               id="password" name="password" class="form-control" value="admin"/>
    </div>
    <br/>


    <button class="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
</form>
