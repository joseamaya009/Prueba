import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Eye, EyeOff, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import logoImage from '../../imports/aaa-Photoroom-1.png';

interface LoginScreenProps {
  onLogin: (role: 'admin' | 'technician' | 'user') => void;
  onRegisterClick: () => void;
}

export function LoginScreen({ onLogin, onRegisterClick }: LoginScreenProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos y que el email tenga formato válido
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Siempre iniciar sesión como usuario final
    onLogin('user');
  };

  // RF4 - Recuperación de contraseña
  const handlePasswordReset = () => {
    if (!resetEmail) {
      toast.error('Por favor ingresa tu correo electrónico');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      toast.error('Por favor ingresa un correo electrónico válido');
      return;
    }

    // RF4.1 - Envío de enlace de recuperación
    toast.success('Correo enviado', {
      description: 'Revisa tu correo electrónico. El enlace es válido por 1 hora.'
    });
    
    setIsResetDialogOpen(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-3 sm:p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left space-y-3 md:space-y-6">
          <div className="flex min-w-0 items-center justify-center md:justify-start gap-3 sm:gap-4">
            <div className="bg-blue-600 p-2 rounded-xl sm:p-3 sm:rounded-2xl">
              <img src={logoImage} alt="HidroSmart Logo" className="h-12 w-auto sm:h-20" />
            </div>
            <h1 className="min-w-0 break-words text-2xl sm:text-5xl text-blue-900 hidrosmart-logo">{t('app.name')}</h1>
          </div>
          <h2 className="text-base sm:text-2xl text-blue-800">{t('app.tagline')}</h2>
          <p className="hidden text-blue-700 sm:block">
            {t('login.description')}
          </p>
          <div className="hidden sm:grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-3xl text-blue-600">24/7</div>
              <div className="text-sm text-blue-700">{t('login.monitoring247')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-600">IoT</div>
              <div className="text-sm text-blue-700">{t('login.smartDevices')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-600">100%</div>
              <div className="text-sm text-blue-700">{t('login.secure')}</div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <Card className="w-full shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mobile-equal-tabs [--mobile-tabs:2]">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* RF2 - Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>
                    Ingresa tus credenciales para acceder al sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="usuario@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* RF4 - Dialog de recuperación de contraseña */}
                  <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                    <DialogTrigger asChild>
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                        ¿Olvidaste tu contraseña?
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Recuperar Contraseña</DialogTitle>
                        <DialogDescription>
                          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="resetEmail">Correo electrónico</Label>
                          <Input 
                            id="resetEmail"
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                          />
                        </div>
                        <Alert>
                          <Info className="size-4" />
                          <AlertDescription className="text-xs">
                            El enlace de recuperación será válido por 1 hora y se registrará en el historial de auditoría
                          </AlertDescription>
                        </Alert>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handlePasswordReset}>
                          Enviar Enlace
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Iniciar Sesión
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* RF1 - Register Tab */}
            <TabsContent value="register">
              <form onSubmit={(e) => { e.preventDefault(); onRegisterClick(); }}>
                <CardHeader>
                  <CardTitle>Crear Cuenta</CardTitle>
                  <CardDescription>
                    Completa todos los campos obligatorios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input id="name" placeholder="Juan Pérez" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="docType">Tipo de documento *</Label>
                      <Select required>
                        <SelectTrigger id="docType">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CC">Cédula de Ciudadanía (C.C)</SelectItem>
                          <SelectItem value="CE">Cédula de Extranjería (C.E)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="docNumber">Número de documento *</Label>
                      <Input id="docNumber" placeholder="1234567890" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Correo electrónico *</Label>
                    <Input 
                      id="registerEmail" 
                      type="email" 
                      placeholder="usuario@ejemplo.com"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Contraseña *</Label>
                    <Input 
                      id="registerPassword" 
                      type="password"
                      placeholder="••••••••"
                      required 
                    />
                    <p className="text-xs text-gray-600">
                      Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="size-4" />
                    <AlertDescription className="text-xs">
                      Se enviará un correo de verificación para completar el registro
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Crear Cuenta
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
