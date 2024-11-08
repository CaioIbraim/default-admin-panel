// components/HeroSection.tsx
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { motion } from 'framer-motion'; // Usaremos framer-motion para animações

// Tipagem do Form Values
interface FormValues {
  name: string;
  email: string;
}

const HeroSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Função para simular o envio do formulário
  const handleSubmit = (values: FormValues): void => {
    setLoading(true);
    // Simulando uma requisição de cadastro
    setTimeout(() => {
      message.success('Cadastro realizado com sucesso!');
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundImage: 'url(/hero-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', textAlign: 'center' }}>
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: -100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ padding: '100px 20px', zIndex: 1, position: 'relative' }}
      >
        <h1 style={{ fontSize: '50px', fontWeight: 'bold', marginBottom: '20px' }}>Bem-vindo à Nossa Plataforma</h1>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>Cadastre-se para começar sua jornada agora mesmo!</p>

        {/* Formulário de Cadastro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.6)', padding: '30px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
            >
              <Input placeholder="Seu nome completo" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }, { type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
            >
              <Input placeholder="seuemail@exemplo.com" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? 'Processando...' : 'Cadastrar'}
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </motion.div>

      {/* Botão de Ação */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <Button type="link" style={{ color: 'white', fontSize: '18px' }} href="#features">
          Saiba mais sobre a plataforma
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
