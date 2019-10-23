module RelativeAuth
extend ActiveSupport::Concern

included do
  helper_method :auth_scheme
end

def auth_scheme

     return "auth/saml"
    
  end
end
