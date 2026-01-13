import { useState } from 'react';

export default function GenerateEmailLink({ formData, onLinkGenerated }) {
  const generateEmailLink = () => {
    const { firstName, lastName, email, phone, organizationName } = formData;

    // Create email subject and body
    const subject = encodeURIComponent('Update Data Request');
    const body = encodeURIComponent(
      `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phone}\nOrganization Name: ${organizationName}`
    );

    // Generate mailto link
    const mailtoLink = `mailto:info@adaptationregistry.org?subject=${subject}&body=${body}`;

    if (onLinkGenerated) {
      onLinkGenerated(mailtoLink);
    }

    return mailtoLink;
  };

  return { generateEmailLink };
}