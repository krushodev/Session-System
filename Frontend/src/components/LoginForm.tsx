const LoginForm = () => {
  return (
    <form>
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

export default LoginForm;
