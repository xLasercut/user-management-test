import {create} from 'zustand';
import {Email} from '../types.ts';
import {TCreateEmailRequestBody} from '../models/email-notifications-api/create-email.ts';
import {v4} from 'uuid';

interface TState {
  emails: Email[];
  createEmail: (body: TCreateEmailRequestBody) => void;
}

const emailNotificationApi = create<TState>(set => ({
  emails: [],
  createEmail: (body: TCreateEmailRequestBody) => {
    return set(state => {
      const jobId = v4();
      const newEmail: Email = {
        ...body,
        job_id: jobId,
        creation_time: new Date().toISOString(),
        status: 'pending',
        subject: `${body.subject} - REF: ${jobId}`,
      };
      return {
        emails: [...state.emails, newEmail],
      };
    });
  },
}));

export {emailNotificationApi};
