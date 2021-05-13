import React, { FC, useEffect, useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import LineAwesome from 'components/LineAwesome';
import { firestore } from 'firebase/config';
import { useFormik } from 'formik';
import { isEmpty } from 'ramda';

export interface HomePageProps {}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const HomePage: FC<HomePageProps> = () => {
  const [contacts, setContacts] = useState<Contact[]>([{} as Contact]);
  const contactRef = firestore.collection('contacts');
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState({} as Contact);
  const formik = useFormik<Omit<Contact, 'id'>>({
    initialValues: isEmpty(editItem) ? { name: '', email: '', phone: '' } : { name: editItem.name, email: editItem.email, phone: editItem.phone },
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (isEmpty(editItem)) {
        await contactRef.add(values);
        setEditItem({} as Contact);
        actions.resetForm({ values: { name: '', email: '', phone: '' } });
      } else {
        await contactRef.doc(editItem.id).update(values);
        setEditItem({} as Contact);
        actions.resetForm({ values: { name: '', email: '', phone: '' } });
      }
    },
  });

  useEffect(() => {
    let unsubcribe: () => void;
    const fetchData = async () => {
      setLoading(true);
      // const snapshot = await firestore.collection('contacts').where('name', '==', 'Phung').orderBy('phone').get(); // async
      // const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
      // setContacts(data);
      // =============================
      // real-time
      unsubcribe = await contactRef.onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
        setContacts(data);
        setLoading(false);
      });
    };
    fetchData();
    return () => {
      unsubcribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (id: Contact['id']) => () => {
    const editItem = contacts.find(contact => contact.id === id) as Contact;
    setEditItem(editItem);
  };

  const handleDelete = (id: Contact['id']) => () => {
    contactRef.doc(id).delete();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name">Name</label>
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            idHTML="name"
            placeholder="Enter your name"
            prefix={<LineAwesome name="user" size={20} />}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email">Email</label>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            idHTML="email"
            placeholder="mail@gmail.com"
            prefix={<LineAwesome name="envelope" size={20} />}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="phone">Phone</label>
          <Input
            value={formik.values.phone}
            onChange={formik.handleChange}
            idHTML="phone"
            placeholder="Enter your phone"
            prefix={<LineAwesome name="phone" size={20} />}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button shape="round" icon={<LineAwesome name="send" size={20} />} htmlType="submit">
            Save
          </Button>
        </div>
      </form>
      <table cellPadding={20} cellSpacing={10}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>loading...</td>
            </tr>
          ) : (
            contacts.map(contact => {
              return (
                <tr key={contact.id.toString()}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td style={{ display: 'flex', alignItems: 'center' }}>
                    <Button containerClassName="mr-3" onClick={handleEdit(contact.id)} shape="round" htmlType="button">
                      Edit
                    </Button>
                    <Button shape="round" htmlType="button" onClick={handleDelete(contact.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
