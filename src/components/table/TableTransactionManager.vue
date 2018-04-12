<template lang='pug'>
  table
    thead
      tr.header
        th(scope='col') Transaction Date (Time)
        th(scope='col') First Name
        th(scope='col') Last Name
        th(scope='col') Event Name, Time
        th(scope='col') Transaction Total
        th(scope='col') Reservation
        th(scope='col') Payment
    tbody
      tr(v-for='(o, index) in orders', @click="$emit('click', o)")
        td(data-label='Transaction Date') {{ formatDate(o.date.date) }}
        td(data-label='First Name') {{ o.buyer.name }}
        td(data-label='Last Name') {{ o.buyer.name }}
        td(data-label='Event Name') {{ o.order_lines[index].product.translations.name.en }}
        td(data-label='Transaction Total') {{ o.order_lines[index].price.amount / 100 | currency('') }} {{ o.order_lines[index].price.currency.translations.symbol.en }}
        td(data-label='Reservation') {{ o.actual_transaction.status }}
        td(data-label='Payment') {{ o.transactions[index].status }}
          //i.material-icons cancel
      tr.footer
        td(data-label='Total', colspan='8', style='text-align: right;') Total Transactions: 
          strong {{ orders.length }}
</template>

<script>
  import moment from 'moment'

  export default {
    methods: {
      formatDate (date) {
        return moment(date).format('DD.MM.YYYY (hh:mm)')
      }
    },
    data () {
      return {
        orders: [
          {
            'id': 1,
            'code': '5debfh7rj',
            'date': {
              'date': '2018-01-10 00:42:54.000000',
              'timezone_type': 3,
              'timezone': 'UTC'
            },
            'status': 'approved',
            'order_name': 'Order name',
            'configuration': {
              'language': 'de',
              'company_name': 'Appleseed Consulting',
              'company_registration_number': '59337298203',
              'company_tax_number': '59487392038563',
              'company_country': 'Latvia',
              'company_address': 'Merķeļa iela 5-10b,',
              'company_city': 'Riga',
              'company_zip': 'LV-1021',
              'working': '0'
            },
            'documents': [],
            'attributes': [],
            'order_lines': [
              {
                'id': 1,
                'amount': 1,
                'charges': [],
                'product': {
                  'id': 5,
                  'translations': {
                    'name': {
                      'en': 'Trial lesson',
                      'de': 'Schnupperstunde',
                      'ru': 'Test Lesson'
                    },
                    'description': {
                      'en': 'Test Lesson',
                      'de': 'Test Lesson',
                      'ru': 'Test Lesson'
                    }
                  },
                  'custom_fields': {
                    'config_status': 'public',
                    'config_minimum_ticket_count': '1',
                    'config_maximum_ticket_count': '2',
                    'config_visible': 'visible'
                  },
                  'code': 'trial.DW3',
                  'price': {
                    'amount': 1900,
                    'currency': {
                      'id': 2,
                      'code': 'eur',
                      'translations': {
                        'symbol': {
                          'en': '€'
                        },
                        'singular': {
                          'en': 'euro'
                        },
                        'plural': {
                          'en': 'euros'
                        }
                      }
                    }
                  },
                  'charges': {
                    'must': [],
                    'deny': [
                      'amount_discount',
                      'vat13'
                    ],
                    'can': []
                  }
                },
                'price': {
                  'amount': 1900,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                }
              },
              {
                'id': 2,
                'amount': 3,
                'charges': [],
                'product': {
                  'id': 181,
                  'translations': {
                    'name': {
                      'en': 'Ballet for adults (Beginners+)',
                      'de': 'Ballett für Erwachsene (Anfänger +)',
                      'ru': 'Балет для взрослых (Начинающий уровень +)'
                    }
                  },
                  'custom_fields': {
                    'config_status': 'public',
                    'config_minimum_ticket_count': '1',
                    'config_maximum_ticket_count': '10',
                    'config_visible': 'visible'
                  },
                  'code': 'BFAB1',
                  'price': {
                    'amount': 19900,
                    'currency': {
                      'id': 2,
                      'code': 'eur',
                      'translations': {
                        'symbol': {
                          'en': '€'
                        },
                        'singular': {
                          'en': 'euro'
                        },
                        'plural': {
                          'en': 'euros'
                        }
                      }
                    }
                  },
                  'charges': {
                    'must': [],
                    'deny': [
                      'vat20'
                    ],
                    'can': []
                  }
                },
                'price': {
                  'amount': 59700,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                }
              },
              {
                'id': 3,
                'amount': 1,
                'charges': [],
                'product': {
                  'id': 183,
                  'translations': {
                    'name': {
                      'en': 'Ballet for adults (Intermediate)',
                      'de': 'Ballett für Erwachsene (Mittlere Niveau)',
                      'ru': 'Балет для взрослых (Средний уровень)'
                    }
                  },
                  'custom_fields': {
                    'config_status': 'public',
                    'config_minimum_ticket_count': '1',
                    'config_maximum_ticket_count': '8',
                    'config_visible': 'visible'
                  },
                  'code': 'BFAI2',
                  'price': {
                    'amount': 19900,
                    'currency': {
                      'id': 2,
                      'code': 'eur',
                      'translations': {
                        'symbol': {
                          'en': '€'
                        },
                        'singular': {
                          'en': 'euro'
                        },
                        'plural': {
                          'en': 'euros'
                        }
                      }
                    }
                  },
                  'charges': {
                    'must': [],
                    'deny': [
                      'vat20'
                    ],
                    'can': []
                  }
                },
                'price': {
                  'amount': 19900,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                }
              }
            ],
            'actual_transaction': {
              'id': 1,
              'status': 'approved',
              'to_pay': {
                'amount': 66700,
                'currency': {
                  'id': 2,
                  'code': 'eur',
                  'translations': {
                    'symbol': {
                      'en': '€'
                    },
                    'singular': {
                      'en': 'euro'
                    },
                    'plural': {
                      'en': 'euros'
                    }
                  }
                }
              },
              'paid': {
                'amount': 66700,
                'currency': {
                  'id': 2,
                  'code': 'eur',
                  'translations': {
                    'symbol': {
                      'en': '€'
                    },
                    'singular': {
                      'en': 'euro'
                    },
                    'plural': {
                      'en': 'euros'
                    }
                  }
                }
              },
              'gateway': {
                'id': 5,
                'code': 'ticketyl.approve',
                'translations': {
                  'logo': {
                    'en': 'approve.png'
                  }
                }
              },
              'date': {
                'date': '2018-01-10 00:43:07.000000',
                'timezone_type': 3,
                'timezone': 'UTC'
              }
            },
            'transactions': [
              {
                'id': 1,
                'status': 'approved',
                'to_pay': {
                  'amount': 66700,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                },
                'paid': {
                  'amount': 66700,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                },
                'gateway': {
                  'id': 5,
                  'code': 'ticketyl.approve',
                  'translations': {
                    'logo': {
                      'en': 'approve.png'
                    }
                  }
                },
                'date': {
                  'date': '2018-01-10 00:43:07.000000',
                  'timezone_type': 3,
                  'timezone': 'UTC'
                }
              }
            ],
            'buyer': {
              'id': 1,
              'name': 'Test Buyer',
              'email': 'indulis@svagers.lv',
              'phone': '22042172',
              'ip': '192.168.10.1',
              'translations': [],
              'configuration': [],
              'attributes': {
                'country': 'Latvia',
                'address': 'Merķeļa iela 5-10b,',
                'city': 'Riga',
                'zip': 'LV-1021'
              }
            },
            'voucher': null,
            'charges': [
              {
                'price_applied': {
                  'amount': 14800,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                },
                'charge_group': {
                  'id': 1,
                  'code': 'amount_discount',
                  'translations': {
                    'name': {
                      'en': 'Multidiscount',
                      'de': 'Multirabatt',
                      'ru': 'Мультискидка'
                    }
                  },
                  'charges': [
                    {
                      'id': 1,
                      'price': {
                        'amount': 4900,
                        'currency': {
                          'id': 2,
                          'code': 'eur',
                          'translations': {
                            'symbol': {
                              'en': '€'
                            },
                            'singular': {
                              'en': 'euro'
                            },
                            'plural': {
                              'en': 'euros'
                            }
                          }
                        }
                      },
                      'rules': [
                        {
                          'id': 1,
                          'key': 'ticket_count',
                          'operator': '=',
                          'value': '2'
                        }
                      ]
                    },
                    {
                      'id': 2,
                      'price': {
                        'amount': 14800,
                        'currency': {
                          'id': 2,
                          'code': 'eur',
                          'translations': {
                            'symbol': {
                              'en': '€'
                            },
                            'singular': {
                              'en': 'euro'
                            },
                            'plural': {
                              'en': 'euros'
                            }
                          }
                        }
                      },
                      'rules': [
                        {
                          'id': 2,
                          'key': 'ticket_count',
                          'operator': '>',
                          'value': '2'
                        }
                      ]
                    }
                  ],
                  'configuration': {
                    'visible': 'visible',
                    'status': 'public',
                    'scope': 'order',
                    'included': 'excluded'
                  }
                }
              },
              {
                'price_applied': {
                  'amount': 316,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                },
                'charge_group': {
                  'id': 2,
                  'code': 'vat20',
                  'translations': {
                    'name': {
                      'en': 'VAT 20%',
                      'de': 'MwSt 20%',
                      'ru': 'НДС 20%'
                    }
                  },
                  'charges': [
                    {
                      'id': 3,
                      'price': {
                        'amount': 20,
                        'currency': {
                          'id': 1,
                          'code': '%',
                          'translations': {
                            'symbol': {
                              'en': '%'
                            },
                            'singular': {
                              'en': 'percent'
                            },
                            'plural': {
                              'en': 'percent'
                            }
                          }
                        }
                      },
                      'rules': []
                    }
                  ],
                  'configuration': {
                    'visible': 'visible',
                    'status': 'public',
                    'included': 'included',
                    'scope': 'order'
                  }
                }
              },
              {
                'price_applied': {
                  'amount': 9157,
                  'currency': {
                    'id': 2,
                    'code': 'eur',
                    'translations': {
                      'symbol': {
                        'en': '€'
                      },
                      'singular': {
                        'en': 'euro'
                      },
                      'plural': {
                        'en': 'euros'
                      }
                    }
                  }
                },
                'charge_group': {
                  'id': 3,
                  'code': 'vat13',
                  'translations': {
                    'name': {
                      'en': 'VAT 13%',
                      'de': 'MwSt 13%',
                      'ru': 'НДС 13%'
                    }
                  },
                  'charges': [
                    {
                      'id': 4,
                      'price': {
                        'amount': 13,
                        'currency': {
                          'id': 1,
                          'code': '%',
                          'translations': {
                            'symbol': {
                              'en': '%'
                            },
                            'singular': {
                              'en': 'percent'
                            },
                            'plural': {
                              'en': 'percent'
                            }
                          }
                        }
                      },
                      'rules': []
                    }
                  ],
                  'configuration': {
                    'visible': 'visible',
                    'status': 'public',
                    'included': 'included',
                    'scope': 'order'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang='less' scoped>
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  tbody{
    font-size: 18px;
  }
  .footer{
    font-size: 14px;
    border-bottom: none;
    text-transform: uppercase;
  }
}
table caption {
  color: #292929;
  font-size: 18px;
}
.header{
  color: #fff;
  text-transform: none;
  background-color: #9a9a9a;
  &:hover{
    background-color: #9a9a9a !important;
  }
}
table tr {
  background: #f7f7f7;
  border-bottom: 1px solid #979797;
  &:hover{
    background-color: #e4e4e4;
  }
}
table th{
  padding: 16px;
}
table td {
  padding: 26px 16px;
  text-align: left;
  &:hover{
    cursor: pointer;
  }
  &:nth-child(6){
    font-size: 12px;
  }
  &:nth-child(7){
    font-size: 12px;
  }
  .material-icons{
    font-size: 16px;
    padding-left: 8px;
    vertical-align: sub;
  }
}
table th {
  font-size: 14px;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    font-size: 14px;
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>
