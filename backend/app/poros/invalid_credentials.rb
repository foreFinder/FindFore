class InvalidCredentials < StandardError
  def http_status
    401
  end

  def code
    "unauthorized"
  end

  def message
    "Invalid credentials, please try again"
  end
end
