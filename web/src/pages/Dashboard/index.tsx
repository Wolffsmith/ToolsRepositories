import React, { useRef, useState, useEffect } from 'react';
import {
  FiBook,
  FiBookOpen,
  FiLink,
  FiTag,
  FiTrash,
  FiSearch,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Repositories,
  ToolCard,
  DeleteButton,
} from './styles';

import api from '../../services/apiClient';

interface Repository {
  id: string;
  name: string;
  link: string;
  description: string;
  tags: string;
}

// Utilizei a lib do Unform para tratar os forms
const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // Criação dos estados
  const [filter, setFilter] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // Carrega as tools do banco de dados
  const loadData = (tag: string): void => {
    api.get(`/tools?tag=${tag}`).then((resp) => {
      setRepositories(resp.data);
    });
  };

  useEffect(() => {
    loadData(filter);
  }, [filter]);

  // Tratamento do submit do form dos dados do repositório
  const handleSubmit = async (data: Repository): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      // Usei o Yup para validar os inputs
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Tool obrigatório'),
        link: Yup.string()
          .required('Link da tool obrigatório')
          .url('Formato não é uma URL'),
        description: Yup.string().required('Descrição da Tool obrigatória'),
        tags: Yup.string().required('No mínimo uma tag deve ser criada'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/tools', data);

      loadData('');

      // Limpa os campos após enviar
      formRef.current?.clearField('name');
      formRef.current?.clearField('link');
      formRef.current?.clearField('description');
      formRef.current?.clearField('tags');
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  };

  // Tratamento do form do filtro
  const formFilter = useRef<FormHandles>(null);
  const handleFilter = (): void => {
    const tag = formFilter.current?.getFieldValue('filter');
    setFilter(tag);
    formFilter.current?.clearField('filter');
  };

  const handleDelete = async (repoID: string): Promise<void> => {
    await api.delete(`/tools/${repoID}`);

    loadData('');
  };

  return (
    <Container>
      <Repositories>
        {repositories.map((repository) => (
          <ToolCard>
            <div key={repository.id}>
              <strong>{repository.name}</strong>
              <p>{repository.description}</p>
              <a
                href={repository.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {repository.link}
              </a>
            </div>
            <span>
              <p>{repository.tags}</p>
            </span>
            <DeleteButton onClick={() => handleDelete(repository.id)}>
              <FiTrash color="rgb(223, 46, 48)" size={20} />
            </DeleteButton>
          </ToolCard>
        ))}
      </Repositories>
      <Content>
        <div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Salve suas Tools</h1>

            <Input name="name" icon={FiBook} placeholder="Nome" />
            <Input name="link" icon={FiLink} placeholder="Link" />
            <Input
              name="description"
              icon={FiBookOpen}
              placeholder="Descrição da Tool"
            />
            <Input name="tags" icon={FiTag} placeholder="Use '#' entre Tags" />

            <Button type="submit">Salvar</Button>
          </Form>
          <Form ref={formFilter} onSubmit={handleFilter}>
            <Input
              name="filter"
              icon={FiSearch}
              placeholder="Digite uma tag para filtrar"
            />
            <Button type="submit">Filtrar</Button>
          </Form>
        </div>
      </Content>
    </Container>
  );
};

export default Dashboard;
