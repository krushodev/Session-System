const RegisterForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="username">Name</label>
        <input type="text" id="username"/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default RegisterForm;
