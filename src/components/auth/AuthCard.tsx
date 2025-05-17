
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, languageList } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, ScrollIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AuthCard = () => {
  const { login, signup } = useAuth();
  const { language, setLanguage, translations } = useLanguage();
  const { ageGroup } = useTheme();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    childAge: '',
    childGrade: '',
    childGender: '',
  });
  
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name: signupData.name,
      surname: signupData.surname,
      email: signupData.email,
      childAge: parseInt(signupData.childAge) || undefined,
      childGrade: signupData.childGrade,
      childGender: signupData.childGender as 'male' | 'female' | 'other',
    });
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setSignupData(prev => ({ ...prev, [name]: value }));
  };
  
  // Translation keys
  const loginText = translations['auth.login'] || 'Login';
  const signupText = translations['auth.signup'] || 'Sign Up';
  const emailText = translations['auth.email'] || 'Email';
  const passwordText = translations['auth.password'] || 'Password';
  const nameText = translations['auth.name'] || 'Name';
  const surnameText = translations['auth.surname'] || 'Surname';
  const childAgeText = translations['auth.childAge'] || 'Child Age';
  const childGradeText = translations['auth.childGrade'] || 'Child Grade';
  const childGenderText = translations['auth.childGender'] || 'Child Gender';
  const maleText = translations['auth.male'] || 'Male';
  const femaleText = translations['auth.female'] || 'Female';
  const otherText = translations['auth.other'] || 'Other';
  const selectLanguageText = translations['auth.selectLanguage'] || 'Select Language';
  const welcomeText = translations['auth.welcome'] || 'Welcome to Learn Quest';
  const accountText = translations['auth.account'] || 'Your Account';
  
  return (
    <Card className={`w-[350px] md:w-[450px] ${fontClass} shadow-xl max-h-[90vh]`}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">{welcomeText}</CardTitle>
        <CardDescription className="text-center">{accountText}</CardDescription>
        
        <div className="flex justify-center mt-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder={selectLanguageText} />
            </SelectTrigger>
            <SelectContent>
              {languageList.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{loginText}</TabsTrigger>
            <TabsTrigger value="signup">{signupText}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">{emailText}</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">{passwordText}</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    required 
                  />
                </div>
                <Button className="mt-2" type="submit">{loginText}</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <ScrollArea className="h-[400px] pr-4">
              <form onSubmit={handleSignupSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="signup-name">{nameText}</Label>
                      <Input 
                        id="signup-name" 
                        name="name" 
                        value={signupData.name} 
                        onChange={handleSignupChange} 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-surname">{surnameText}</Label>
                      <Input 
                        id="signup-surname" 
                        name="surname" 
                        value={signupData.surname} 
                        onChange={handleSignupChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">{emailText}</Label>
                    <Input 
                      id="signup-email" 
                      name="email" 
                      type="email" 
                      value={signupData.email} 
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">{passwordText}</Label>
                    <Input 
                      id="signup-password" 
                      name="password" 
                      type="password" 
                      value={signupData.password} 
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-child-age">{childAgeText}</Label>
                    <Input 
                      id="signup-child-age" 
                      name="childAge" 
                      type="number" 
                      value={signupData.childAge} 
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-child-grade">{childGradeText}</Label>
                    <Input 
                      id="signup-child-grade" 
                      name="childGrade" 
                      value={signupData.childGrade} 
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-child-gender">{childGenderText}</Label>
                    <Select 
                      value={signupData.childGender} 
                      onValueChange={(value) => handleSelectChange('childGender', value)}
                    >
                      <SelectTrigger id="signup-child-gender">
                        <SelectValue placeholder={childGenderText} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{maleText}</SelectItem>
                        <SelectItem value="female">{femaleText}</SelectItem>
                        <SelectItem value="other">{otherText}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-2" type="submit">{signupText}</Button>
                </div>
              </form>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
