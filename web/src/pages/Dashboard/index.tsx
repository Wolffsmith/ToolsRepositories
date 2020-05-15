import React, { useRef, useState, useEffect } from 'react';
import { FiBook, FiBookOpen, FiLink, FiTag, FiDelete } from 'react-icons/fi';
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

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const loadData = (tag: string): void => {
    api.get(`/tools?tag=${tag}`).then((resp) => {
      setRepositories(resp.data);
    });
  };

  useEffect(() => {
    loadData(filter);
  }, [filter]);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Repository): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Tool obrigatório'),
        link: Yup.string().url('Formato não é uma URL'),
        description: Yup.string().required('Descrição da Tool obrigatória'),
        tags: Yup.string().required('No mínimo uma tag deve ser criada'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/tools', data);

      loadData('');

      formRef.current?.clearField('name');
      formRef.current?.clearField('link');
      formRef.current?.clearField('description');
      formRef.current?.clearField('tags');
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
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
              <FiDelete color="rgb(223, 46, 48)" size={20} />
            </DeleteButton>
          </ToolCard>
        ))}
      </Repositories>
      <Content>
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
      </Content>
    </Container>
  );
};

export default Dashboard;
