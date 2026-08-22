export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-pmi-cream flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-pmi-dark mb-2">Recuperar senha</h1>
        <p className="text-sm text-gray-500 mb-6">
          Funcionalidade em desenvolvimento. Em breve você poderá recuperar sua senha.
        </p>
        <a
          href="/pt/auth/signin"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors"
        >
          Voltar para o login
        </a>
      </div>
    </div>
  )
}
